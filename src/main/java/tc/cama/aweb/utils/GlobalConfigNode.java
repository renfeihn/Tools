// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   GlobalConfigNode.java

package tc.cama.aweb.utils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import cn.com.agree.aweb.exception.AfaConfigException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tc.cama.aweb.bean.AfaDeviceType;
import tc.cama.aweb.bean.ConfigFileXPath;
import tc.cama.aweb.bean.ISchemaNode;
import tc.cama.aweb.bean.ItemJson;
import tc.cama.aweb.bean.MonitorJson;
import tc.cama.aweb.bean.PageJson;
import tc.cama.aweb.bean.SwitchJson;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml:
//			ConfigNodeSupport, ConfigFileXPath

public class GlobalConfigNode extends ConfigNodeSupport
{

	private boolean isComponent;
	private static final String SCRIPTPATHS = "scriptPaths";
	private static final String MONITOR = "monitor";
	private static final String AIMOPTIONS = "aimOptions";
	private static final String ADDRESS = "address";
	private static Map xpathMap;

	public GlobalConfigNode(byte configContents[])
		throws AfaConfigException
	{
		super(configContents);
		isComponent = false;
	}

	public GlobalConfigNode(String configStr)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.PLATFORM);
		isComponent = false;
		isComponent = true;
	}

	protected void initArea()
	{
		setBases(new String[] {
			"licenseFile", "instanceName", "isolation"
		});
		setCores(new String[] {
			"adminPort", "scriptRoot"
		});
		setGroups(new String[] {
			"scriptPaths"
		});
	}

	public Element getElement()
	{
		return getElementByXPath(ConfigFileXPath.global());
	}

	public PageJson getPageJson(SchemaManager schema)
	{
		PageJson pageJson = PageJson.allocate();
		addVersionElementJson(getElementByXPath(ConfigFileXPath.version()), pageJson, schema);
		iteratorElement(getElement(), pageJson, schema);
		addMonitorElementJson(getElementByXPath(ConfigFileXPath.monitor()), pageJson, schema);
		return pageJson;
	}

	protected void iteratorElement(Element parent, PageJson pageJson, SchemaManager schema)
	{
		List elements = parent.elements();
		for (Iterator iterator = elements.iterator(); iterator.hasNext();)
		{
			Element element = (Element)iterator.next();
			String elementName = element.getName();
			ISchemaNode schemaNode = schema.getSchemaNode(element.getPath());
			if (isBaseItem(elementName))
			{
				ItemJson eleJson = createLeafElementJson(element, schemaNode);
				pageJson.addBaseItem(elementName, eleJson);
			} else
			if (isCoreItem(elementName))
			{
				ItemJson eleJson = createLeafElementJson(element, schemaNode);
				pageJson.addCoreItem(elementName, eleJson);
			} else
			if (isGroupItem(elementName))
			{
				PageJson.GroupJson groupJson = pageJson.group(elementName);
				if(schemaNode!=null){
				groupJson.setDesp(schemaNode.getAnnotation());
				}
				groupJson.setxPath(convertPath(element.getPath()));
				groupJson.setUniqueId(uniqueId());
				ISchemaNode childCustomSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get(elementName));
				JSONObject appendNode = null;
				if (childCustomSchemaNode != null)
				{
					appendNode = createCustomJson(childCustomSchemaNode, schema, groupJson.getxPath());
					groupJson.setAppendNode(appendNode);
				}
				List childs = element.elements();
				ItemJson childJson;
				for (Iterator iterator1 = childs.iterator(); iterator1.hasNext(); groupJson.addItem(childJson))
				{
					Element child = (Element)iterator1.next();
					ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
					childJson = createLeafElementJson(child, childSchemaNode);
				}

			}
		}

	}

	private JSONObject createCustomJson(ISchemaNode schemaNode, SchemaManager schema, String parentXPath)
	{
		JSONObject json = null;
		if (((String)xpathMap.get("scriptPaths")).equals(schemaNode.getXPath()))
			json = JSONObject.fromObject(createCustomItemJson(schemaNode, parentXPath.substring(0, parentXPath.lastIndexOf("/"))));
		if (((String)xpathMap.get("monitor")).equals(schemaNode.getXPath()))
			json = JSONObject.fromObject(createCustomMonitorJson(schemaNode, schema, parentXPath));
		if (((String)xpathMap.get("address")).equals(schemaNode.getXPath()))
			json = JSONObject.fromObject(createCustomItemJson(schemaNode, parentXPath.substring(0, parentXPath.lastIndexOf("/"))));
		if (((String)xpathMap.get("aimOptions")).equals(schemaNode.getXPath()))
			json = JSONObject.fromObject(createCustomSwitchJson(schemaNode, schema, parentXPath));
		return json;
	}

	private MonitorJson createCustomMonitorJson(ISchemaNode schemaNode, SchemaManager schema, String parentXPath)
	{
		MonitorJson monitorJson = new MonitorJson(schemaNode.getName());
		monitorJson.setDesp(schemaNode.getAnnotation());
		monitorJson.setxPath(parentXPath == null ? schemaNode.getXPath() : (new StringBuilder(String.valueOf(parentXPath))).append(schemaNode.getXPath()).toString());
		monitorJson.setUniqueId(uniqueId());
		monitorJson.setCustomizable(schemaNode.isCustomizable());
		ISchemaNode aimOptionsSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get("aimOptions"));
		JSONObject appendNode = null;
		if (aimOptionsSchemaNode != null)
		{
			appendNode = createCustomJson(aimOptionsSchemaNode, schema, monitorJson.getxPath());
			monitorJson.setAppendNode(appendNode);
		}
		List xPathOfChilds = schemaNode.getxPathOfChild();
		if (xPathOfChilds != null && xPathOfChilds.size() > 0)
		{
			Iterator iterator = xPathOfChilds.iterator();
			while (iterator.hasNext()) 
			{
				String xPathOfChild = (String)iterator.next();
				ISchemaNode childNode = schema.getCustomSchemaNode(xPathOfChild);
				if (xPathOfChilds.indexOf(xPathOfChild) == 0)
				{
					ItemJson usable = createCustomItemJson(childNode, parentXPath);
					monitorJson.setUsable(usable);
					continue;
				}
				if (xPathOfChilds.indexOf(xPathOfChild) == xPathOfChilds.size() - 1)
					break;
				ItemJson itemJson = createCustomItemJson(childNode, parentXPath);
				if (childNode.getxPathOfChild() != null && childNode.getxPathOfChild().size() > 0)
				{
					JSONObject jsonObject = JSONObject.fromObject(itemJson);
					jsonObject.remove("value");
					JSONArray childArr = new JSONArray();
					List childs = childNode.getxPathOfChild();
					ItemJson childJson;
					for (Iterator iterator1 = childs.iterator(); iterator1.hasNext(); childArr.add(childJson))
					{
						String child = (String)iterator1.next();
						ISchemaNode tempNode = schema.getCustomSchemaNode(child);
						childJson = createCustomItemJson(tempNode, childNode.getXPath());
					}

					jsonObject.put("child", childArr);
					monitorJson.addChild(jsonObject);
				} else
				{
					monitorJson.addNodes(createCustomItemJson(childNode, parentXPath));
				}
			}
		}
		return monitorJson;
	}

	private SwitchJson createCustomSwitchJson(ISchemaNode schemaNode, SchemaManager schema, String parentXPath)
	{
		ISchemaNode refSchemaNode = null;
		if (schemaNode.getRef() != null && schemaNode.getRef().length() > 0)
			refSchemaNode = schema.getCustomSchemaNode((new StringBuilder("/")).append(schemaNode.getRef()).toString());
		boolean hasRefNode = refSchemaNode != null;
		String name = hasRefNode ? refSchemaNode.getName() : schemaNode.getName();
		SwitchJson switchJson = new SwitchJson(name);
		String desp = schemaNode.getAnnotation();
		if ((desp == null || desp.length() == 0) && hasRefNode)
			desp = refSchemaNode.getAnnotation();
		switchJson.setDesp(desp);
		String childXPath = null;
		if (hasRefNode)
			childXPath = refSchemaNode.getXPath();
		else
			childXPath = schemaNode.getXPath();
		switchJson.setxPath(parentXPath != null ? (new StringBuilder(String.valueOf(parentXPath))).append(childXPath).toString() : childXPath);
		switchJson.setUniqueId(uniqueId());
		switchJson.setCustomizable(schemaNode.isCustomizable());
		ISchemaNode childSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get("address"));
		JSONObject appendNode = null;
		if (childSchemaNode != null)
		{
			appendNode = createCustomJson(childSchemaNode, schema, switchJson.getxPath());
			switchJson.setAppendNode(appendNode);
		}
		List xPathOfChilds = schemaNode.getxPathOfChild();
		if (xPathOfChilds == null && hasRefNode)
			xPathOfChilds = refSchemaNode.getxPathOfChild();
		if (xPathOfChilds != null && xPathOfChilds.size() > 0)
		{
			for (Iterator iterator = xPathOfChilds.iterator(); iterator.hasNext();)
			{
				String xPathOfChild = (String)iterator.next();
				ISchemaNode childNode = schema.getCustomSchemaNode(xPathOfChild);
				if (xPathOfChilds.indexOf(xPathOfChild) == 0)
				{
					ItemJson usable = createCustomItemJson(childNode, parentXPath);
					switchJson.setUsable(usable);
				} else
				{
					ItemJson itemJson = createCustomItemJson(childNode, parentXPath);
					if (childNode.getxPathOfChild() != null && childNode.getxPathOfChild().size() > 0)
					{
						JSONObject jsonObject = JSONObject.fromObject(itemJson);
						jsonObject.remove("value");
						JSONArray childArr = new JSONArray();
						List childs = childNode.getxPathOfChild();
						if (childs != null)
						{
							ItemJson childJson;
							for (Iterator iterator1 = childs.iterator(); iterator1.hasNext(); childArr.add(childJson))
							{
								String child = (String)iterator1.next();
								ISchemaNode tempNode = schema.getCustomSchemaNode(child);
								childJson = createCustomItemJson(tempNode, childNode.getXPath());
							}

						}
						jsonObject.put("child", childArr);
						switchJson.addChild(jsonObject);
					} else
					{
						switchJson.addNodes(createCustomItemJson(childNode, parentXPath));
					}
				}
			}

		}
		return switchJson;
	}

	public Document createDocumentFromPageJson(String rootName, JSONObject pageJson)
	{
		Document document = null;
		if (ConfigFileXPath.GLOBAL.getLabel().equals(rootName) && !isComponent)
			document = createGlobalDocFromPageJson(rootName, pageJson);
		if (ConfigFileXPath.MONITOR.getLabel().equals(rootName) && !isComponent)
			document = createMonitorDocFromPageJson(rootName, pageJson);
		if (ConfigFileXPath.PLATFORM.getLabel().equals(rootName) && isComponent)
		{
			Document globalDoc = createGlobalDocFromPageJson(ConfigFileXPath.GLOBAL.getLabel(), pageJson);
			Document monitorDoc = createMonitorDocFromPageJson(ConfigFileXPath.MONITOR.getLabel(), pageJson);
			Element oldRootEle = getDocument().getRootElement();
			oldRootEle.remove(oldRootEle.element(ConfigFileXPath.GLOBAL.getLabel()));
			oldRootEle.remove(oldRootEle.element(ConfigFileXPath.MONITOR.getLabel()));
			oldRootEle.remove(oldRootEle.element(ConfigFileXPath.WORKGROUPS.getLabel()));
			if (globalDoc != null)
				oldRootEle.add((Element)globalDoc.getRootElement().detach());
			if (monitorDoc != null)
				oldRootEle.add((Element)monitorDoc.getRootElement().detach());
			oldRootEle.addElement(ConfigFileXPath.WORKGROUPS.getLabel());
			document = getDocument();
		}
		return document;
	}

	private Document createGlobalDocFromPageJson(String rootName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
		String GROUPS = "groups";
		Document document = DocumentHelper.createDocument();
		Element globalRoot = createRootElement(document, rootName);
		JSONObject baseJson = pageJson.getJSONObject("base");
		for (Iterator baseIterator = baseJson.keySet().iterator(); baseIterator.hasNext();)
		{
			String label = (String)baseIterator.next();
			if (!ConfigFileXPath.VERSION.getLabel().equalsIgnoreCase(label))
			{
				JSONObject itemJson = baseJson.getJSONObject(label);
				if ("element".equals(itemJson.getString("nodeType")))
				{
					Element element = globalRoot.addElement(label);
					element.setText(itemJson.getString("value"));
				} else
				{
					globalRoot.addAttribute(label, itemJson.getString("value"));
				}
			}
		}

		JSONObject coreJson = pageJson.getJSONObject("core");
		for (Iterator coreIterator = coreJson.keySet().iterator(); coreIterator.hasNext();)
		{
			String label = (String)coreIterator.next();
			JSONObject itemJson = coreJson.getJSONObject(label);
			if ("element".equals(itemJson.getString("nodeType")))
			{
				Element element = globalRoot.addElement(label);
				element.setText(itemJson.getString("value"));
			} else
			{
				globalRoot.addAttribute(label, itemJson.getString("value"));
			}
		}

		JSONObject groupsJson = pageJson.getJSONObject("groups");
		for (Iterator groupsIterator = groupsJson.keySet().iterator(); groupsIterator.hasNext();)
		{
			String groupName = (String)groupsIterator.next();
			Element groupElement = globalRoot.addElement(groupName);
			JSONArray groupItems = groupsJson.getJSONObject(groupName).getJSONArray("fields");
			int i = 0;
			for (int size = groupItems.size(); i < size; i++)
			{
				JSONObject itemJson = groupItems.getJSONObject(i);
				Element element = groupElement.addElement(itemJson.getString("name"));
				element.setText(itemJson.getString("value"));
			}

		}

		return document;
	}

	private Document createMonitorDocFromPageJson(String rootName, JSONObject pageJson)
	{
		Document document = null;
		JSONObject monitorJson = pageJson.getJSONObject("monitor");
		if (!monitorJson.isEmpty())
		{
			document = DocumentHelper.createDocument();
			Element root = createRootElement(document, rootName);
			JSONObject mUsableItem = monitorJson.getJSONObject("usable");
			root.addElement(mUsableItem.getString("name")).setText(mUsableItem.getString("value"));
			JSONArray nodeItems = monitorJson.getJSONArray("nodes");
			int h = 0;
			for (int size = nodeItems.size(); h < size; h++)
			{
				JSONObject itemJson = nodeItems.getJSONObject(h);
				Element element = root.addElement(itemJson.getString("name"));
				element.setText(itemJson.getString("value"));
			}

			String AIMOPTIONS = "aimOptions";
			JSONObject aimJson = monitorJson.getJSONObject("aimOptions");
			if (!aimJson.isEmpty())
			{
				Element aimOptionsEle = root.addElement("aimOptions");
				JSONObject aUsableItem = aimJson.getJSONObject("usable");
				aimOptionsEle.addElement(aUsableItem.getString("name")).setText(aUsableItem.getString("value"));
				JSONArray aNodeItems = aimJson.getJSONArray("nodes");
				int m = 0;
				for (int size = aNodeItems.size(); m < size; m++)
				{
					JSONObject itemJson = aNodeItems.getJSONObject(m);
					Element element = aimOptionsEle.addElement(itemJson.getString("name"));
					element.setText(itemJson.getString("value"));
				}

				JSONArray childItems1 = aimJson.getJSONArray("child");
				int i = 0;
				for (int size1 = childItems1.size(); i < size1; i++)
				{
					JSONObject itemJson1 = childItems1.getJSONObject(i);
					Element childEle = aimOptionsEle.addElement(itemJson1.getString("name"));
					JSONArray childItems2 = itemJson1.getJSONArray("child");
					int j = 0;
					for (int size2 = childItems2.size(); j < size2; j++)
					{
						JSONObject itemJson2 = childItems2.getJSONObject(j);
						Element element = childEle.addElement(itemJson2.getString("name"));
						JSONArray attrs = itemJson2.getJSONArray("attrs");
						if (attrs.isEmpty())
						{
							element.setText(itemJson2.getString("value"));
						} else
						{
							int k = 0;
							for (int size3 = attrs.size(); k < size3; k++)
							{
								JSONObject itemJson3 = attrs.getJSONObject(k);
								element.addAttribute(itemJson3.getString("name"), itemJson3.getString("value"));
							}

						}
					}

				}

			}
		}
		return document;
	}

	private void addVersionElementJson(Element versionEle, PageJson pageJson, SchemaManager schema)
	{
		ISchemaNode schemaNode = schema.getSchemaNode(versionEle.getPath());
		ItemJson eleJson = createLeafElementJson(versionEle, schemaNode);
		pageJson.addBaseItem(ConfigFileXPath.VERSION.getLabel(), eleJson);
	}

	private void addMonitorElementJson(Element monitorEle, PageJson pageJson, SchemaManager schema)
	{
		if (monitorEle != null)
		{
			MonitorJson monitorJson = new MonitorJson(monitorEle.getName());
			ISchemaNode schemaNode = schema.getSchemaNode(monitorEle.getPath());
			monitorJson.setDesp(schemaNode.getAnnotation());
			monitorJson.setxPath(convertPath(monitorEle.getPath()));
			monitorJson.setUniqueId(uniqueId());
			monitorJson.setCustomizable(schemaNode.isCustomizable());
			ISchemaNode aimOptionsSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get("aimOptions"));
			JSONObject appendNode = null;
			if (aimOptionsSchemaNode != null)
			{
				appendNode = createCustomJson(aimOptionsSchemaNode, schema, monitorJson.getxPath());
				monitorJson.setAppendNode(appendNode);
			}
			List eleList = monitorEle.elements();
			for (Iterator iterator = eleList.iterator(); iterator.hasNext();)
			{
				Element ele = (Element)iterator.next();
				if (eleList.indexOf(ele) == 0)
				{
					ItemJson usable = getItemJson(ele, schema);
					monitorJson.setUsable(usable);
				} else
				{
					ItemJson itemJson = getItemJson(ele, schema);
					if (isLeafNode(ele))
						monitorJson.addNodes(itemJson);
					else
					if ("aimOptions".equals(ele.getName()))
					{
						monitorJson.setAimOptions(createSwitchJson(ele, schema, schema.getSchemaNode(ele.getPath())));
					} else
					{
						JSONObject jsonObject = JSONObject.fromObject(itemJson);
						jsonObject.remove("value");
						JSONArray childArr = new JSONArray();
						List childs = ele.elements();
						for (Iterator iterator1 = childs.iterator(); iterator1.hasNext();)
						{
							Element child = (Element)iterator1.next();
							ItemJson childJson = getItemJson(child, schema);
							List attrs = child.attributes();
							if (attrs.size() > 0)
							{
								JSONObject json = JSONObject.fromObject(childJson);
								json.remove("value");
								Attribute attr;
								for (Iterator iterator2 = attrs.iterator(); iterator2.hasNext(); json.put(attr.getName(), attr.getText()))
									attr = (Attribute)iterator2.next();

								childArr.add(json);
							} else
							{
								childArr.add(childJson);
							}
						}

						jsonObject.put("child", childArr);
						monitorJson.addChild(jsonObject);
					}
				}
			}

			pageJson.setMonitor(monitorJson);
		}
		ISchemaNode monitorSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get("monitor"));
		if (monitorSchemaNode != null)
			pageJson.addAppendNodes("monitor", createCustomJson(monitorSchemaNode, schema, "/platform"));
	}

	private SwitchJson createSwitchJson(Element element, SchemaManager schema, ISchemaNode schemaNode)
	{
		SwitchJson switchJson = new SwitchJson(element.getName());
		switchJson.setDesp(schemaNode.getAnnotation());
		switchJson.setxPath(convertPath(element.getPath()));
		switchJson.setUniqueId(uniqueId());
		switchJson.setCustomizable(schemaNode.isCustomizable());
		ISchemaNode childSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get("address"));
		JSONObject appendNode = null;
		if (childSchemaNode != null)
		{
			appendNode = createCustomJson(childSchemaNode, schema, switchJson.getxPath());
			switchJson.setAppendNode(appendNode);
		}
		List eleList = element.elements();
		for (Iterator iterator = eleList.iterator(); iterator.hasNext();)
		{
			Element ele = (Element)iterator.next();
			if (eleList.indexOf(ele) == 0)
			{
				ItemJson usable = getItemJson(ele, schema);
				switchJson.setUsable(usable);
			} else
			{
				ItemJson itemJson = getItemJson(ele, schema);
				if (isLeafNode(ele) && !"addresses".equals(ele.getName()))
				{
					switchJson.addNodes(itemJson);
				} else
				{
					JSONObject jsonObject = JSONObject.fromObject(itemJson);
					jsonObject.remove("value");
					JSONArray childArr = new JSONArray();
					List childs = ele.elements();
					ItemJson childJson;
					for (Iterator iterator1 = childs.iterator(); iterator1.hasNext(); childArr.add(childJson))
					{
						Element child = (Element)iterator1.next();
						childJson = getItemJson(child, schema);
					}

					jsonObject.put("child", childArr);
					switchJson.addChild(jsonObject);
				}
			}
		}

		return switchJson;
	}

	static 
	{
		xpathMap = new HashMap();
		xpathMap.put("scriptPaths", "/scriptPaths/scriptPath");
		xpathMap.put("monitor", "/monitor");
		xpathMap.put("aimOptions", "/monitor/aimOptions");
		xpathMap.put("address", "/aimOptions/addresses/address");
	}
}
