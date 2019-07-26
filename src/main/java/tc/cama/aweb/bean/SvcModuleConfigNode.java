// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   SvcModuleConfigNode.java

package tc.cama.aweb.bean;

import java.util.ArrayList;
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
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.EncipherAndDecipherUtils;
import tc.cama.aweb.utils.SchemaManager;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml:
//			ConfigNodeSupport, ConfigFileXPath

public class SvcModuleConfigNode extends ConfigNodeSupport
{

	private int gid;
	private String switches[];
	private String lists[];
	private String dataSources[];
	private static final String CUSTOMIZEDTRADES = "customizedTrades";
	private static final String DBCONNPOOLS = "dbConnPools";
	private static final String HIBERNATE = "hibernate";
	private static final String PARAMMEMORIZE = "paramMemorize";
	private static Map xpathMap;

	public SvcModuleConfigNode(byte configContents[], int gid)
		throws AfaConfigException
	{
		super(configContents);
		this.gid = gid;
	}

	public SvcModuleConfigNode(String configStr)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.SVC);
	}

	protected void initArea()
	{
		setBases(new String[] {
			"engineType", "hotDeployment", "preloadScript"
		});
		setCores(new String[0]);
		setGroups(new String[] {
			"scriptPaths"
		});
		setLists(new String[] {
			"applog", "threadPool"
		});
		setDataSources(new String[] {
			"dbConnPools", "hibernate"
		});
		setSwitches(new String[] {
			"paramMemorize"
		});
	}

	public Element getElement()
		throws AfaConfigException
	{
		Element svcEle = getElementByXPath(ConfigFileXPath.svc(gid));
		if (svcEle == null)
			throw new AfaConfigException("获取不到该业务处理器的信息，请确认是否已被删除");
		else
			return svcEle;
	}

	public PageJson getPageJson(SchemaManager schema)
		throws AfaConfigException
	{
		PageJson pageJson = PageJson.allocate();
		iteratorElement(getElement(), pageJson, schema);
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
			if (schemaNode.getAttributes() != null && schemaNode.getAttributes().size() > 0)
			{
				SimpleSchemaAttribute schemaAttr;
				ItemJson attrJson;
				for (Iterator iterator1 = schemaNode.getAttributes().iterator(); iterator1.hasNext(); pageJson.addBaseItem(schemaAttr.getName(), attrJson))
				{
					schemaAttr = (SimpleSchemaAttribute)iterator1.next();
					attrJson = createAttrJson(element, schemaAttr);
				}

			}
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
				groupJson.setDesp(schemaNode.getAnnotation());
				groupJson.setxPath(convertPath(element.getPath()));
				groupJson.setUniqueId(uniqueId());
				List childs = element.elements();
				ItemJson childJson;
				for (Iterator iterator2 = childs.iterator(); iterator2.hasNext(); groupJson.addItem(childJson))
				{
					Element child = (Element)iterator2.next();
					ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
					childJson = createLeafElementJson(child, childSchemaNode);
				}

			} else
			if (isListItem(elementName))
			{
				BranchJson eleJson = createBranchElementJson(element, schemaNode, schema);
				pageJson.addList(eleJson);
			} else
			if (isDataSourceItem(elementName))
			{
				BranchJson eleJson = createBranchElementJson(element, schemaNode, schema);
				ISchemaNode childSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get(elementName));
				BranchJson appendNode = createCustomBranchJson(childSchemaNode, schema);
				eleJson.setAppendNode(JSONObject.fromObject(appendNode));
				pageJson.addDataSource(elementName, eleJson);
			} else
			if (isSwitchItem(elementName))
			{
				SwitchJson switchJson = pageJson.switchs(elementName);
				switchJson.setDesp(schemaNode.getAnnotation());
				switchJson.setxPath(convertPath(element.getPath()));
				switchJson.setUniqueId(uniqueId());
				ISchemaNode childSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get(elementName));
				JSONObject appendNode = null;
				if (childSchemaNode != null)
				{
					appendNode = createCustomJson(childSchemaNode, schema, switchJson.getxPath());
					switchJson.setAppendNode(appendNode);
				}
				List eleList = element.elements();
				for (Iterator iterator3 = eleList.iterator(); iterator3.hasNext();)
				{
					Element ele = (Element)iterator3.next();
					if (eleList.indexOf(ele) == 0)
					{
						ItemJson usable = getItemJson(ele, schema);
						switchJson.setUsable(usable);
					} else
					{
						ItemJson itemJson = getItemJson(ele, schema);
						if (isLeafNode(ele) && !"paramSources".equals(ele.getName()))
						{
							switchJson.addNodes(itemJson);
						} else
						{
							JSONObject jsonObject = JSONObject.fromObject(itemJson);
							jsonObject.remove("value");
							JSONArray childArr = new JSONArray();
							List childs = ele.elements();
							for (Iterator iterator4 = childs.iterator(); iterator4.hasNext();)
							{
								Element child = (Element)iterator4.next();
								ItemJson childJson = getItemJson(child, schema);
								List attrs = child.attributes();
								if (attrs.size() > 0)
								{
									JSONObject json = JSONObject.fromObject(childJson);
									json.remove("value");
									Attribute attr;
									for (Iterator iterator5 = attrs.iterator(); iterator5.hasNext(); json.put(attr.getName(), attr.getText()))
										attr = (Attribute)iterator5.next();

									childArr.add(json);
								} else
								{
									childArr.add(childJson);
								}
							}

							jsonObject.put("child", childArr);
							switchJson.addChild(jsonObject);
						}
					}
				}

			}
		}

	}

	protected BranchJson createBranchElementJson(Element element, ISchemaNode schemaNode, SchemaManager schema)
	{
		BranchJson eleJson = new BranchJson();
		eleJson.setName(element.getName());
		eleJson.setxPath(convertPath(element.getPath()));
		eleJson.setNodeType("element");
		eleJson.setCustomizable(schemaNode.isCustomizable());
		eleJson.setAutoApply(schemaNode.isAutoApply());
		eleJson.setDesp(schemaNode.getAnnotation());
		eleJson.setUse(schemaNode.getUse());
		eleJson.setUniqueId(uniqueId());
		eleJson.setMinOccurs(schemaNode.getMinOccurs());
		eleJson.setMaxOccurs(schemaNode.getMaxOccurs());
		for (Iterator iterator = element.elements().iterator(); iterator.hasNext();)
		{
			Element child = (Element)iterator.next();
			String childName = child.getName();
			ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
			if (isLeafNode(child) && !"customizedTrades".equals(childName))
			{
				if ("property".equals(child.getName()))
				{
					String propertyXPath = convertPropertyPath(child.getPath());
					childSchemaNode = schema.getCustomSchemaNode((new StringBuilder(String.valueOf(propertyXPath))).append("/").append(child.attributeValue("name")).toString());
					if (childSchemaNode == null)
						childSchemaNode = schema.getCustomSchemaNode((new StringBuilder(String.valueOf(propertyXPath))).append(element.attributeValue("type")).append("/").append(child.attributeValue("name")).toString());
					eleJson.addNodes(createPropertyElementJson(child, childSchemaNode, element));
				} else
				{
					eleJson.addNodes(createLeafElementJson(child, childSchemaNode));
				}
			} else
			{
				BranchJson childJson = createBranchElementJson(child, childSchemaNode, schema);
				if ("customizedTrades".equals(childName))
				{
					BranchJson appendNode = createCustomBranchJson(schema.getCustomSchemaNode((String)xpathMap.get("customizedTrades")), schema);
					childJson.setAppendNode(JSONObject.fromObject(appendNode));
				}
				eleJson.addChild(childJson);
			}
		}

		if (hasAttributes(schemaNode))
		{
			for (Iterator iterator1 = schemaNode.getAttributes().iterator(); iterator1.hasNext();)
			{
				SimpleSchemaAttribute schemaAttr = (SimpleSchemaAttribute)iterator1.next();
				ItemJson attrJson = createAttrJson(element, schemaAttr);
				if (attrJson != null)
					eleJson.addAttr(attrJson);
			}

		}
		return eleJson;
	}

	private JSONObject createCustomJson(ISchemaNode schemaNode, SchemaManager schema, String parentXPath)
	{
		JSONObject json = null;
		if (((String)xpathMap.get("paramMemorize")).equals(schemaNode.getXPath()))
			json = JSONObject.fromObject(createCustomItemJson(schemaNode, parentXPath));
		return json;
	}

	private BranchJson createCustomBranchJson(ISchemaNode schemaNode, SchemaManager schema)
	{
		BranchJson eleJson = new BranchJson();
		eleJson.setName(schemaNode.getName());
		eleJson.setxPath(schemaNode.getXPath());
		eleJson.setNodeType("element");
		eleJson.setCustomizable(schemaNode.isCustomizable());
		eleJson.setAutoApply(schemaNode.isAutoApply());
		eleJson.setDesp(schemaNode.getAnnotation());
		eleJson.setUse(schemaNode.getUse());
		eleJson.setUniqueId(uniqueId());
		eleJson.setMinOccurs(schemaNode.getMinOccurs());
		eleJson.setMaxOccurs(schemaNode.getMaxOccurs());
		if (schemaNode.getAttributes() != null && schemaNode.getAttributes().size() > 0)
		{
			ItemJson attrJson;
			for (Iterator iterator = schemaNode.getAttributes().iterator(); iterator.hasNext(); eleJson.addAttr(attrJson))
			{
				SimpleSchemaAttribute schemaAttr = (SimpleSchemaAttribute)iterator.next();
				attrJson = createCustomAttrJson(schemaNode, schemaAttr, schema);
			}

		}
		List xPaths = schemaNode.getxPathOfChild();
		if (xPaths != null && xPaths.size() > 0 && schemaNode.getXPath().indexOf("hibernate") != -1)
		{
			SimpleSchemaNode propertySchemaNode = (SimpleSchemaNode)schema.getCustomSchemaNode((String)xPaths.get(0));
			List xPathOfChild = propertySchemaNode.getxPathOfChild();
			ISchemaNode tempNode;
			for (Iterator iterator1 = xPathOfChild.iterator(); iterator1.hasNext(); eleJson.addNodes(createCustomItemJson(tempNode)))
			{
				String xPath = (String)iterator1.next();
				tempNode = schema.getCustomSchemaNode(xPath);
			}

		}
		return eleJson;
	}

	private ItemJson createCustomAttrJson(ISchemaNode schemaNode, SimpleSchemaAttribute schemaAttr, SchemaManager schema)
	{
		ItemJson attrJson = new ItemJson();
		attrJson.setNodeType("attribute");
		attrJson.setName(schemaAttr.getName());
		attrJson.setxPath((new StringBuilder(String.valueOf(schemaNode.getXPath()))).append("/").append("@").append(schemaAttr.getName()).toString());
		attrJson.setCustomizable(schemaAttr.isCustomizable());
		attrJson.setAutoApply(schemaAttr.isAutoApply());
		attrJson.setDesp(schemaAttr.getDesp());
		attrJson.setType(schemaAttr.getType());
		attrJson.setUse(schemaAttr.getUse());
		attrJson.setUniqueId(uniqueId());
		if (schemaAttr.getEnumeration() != null && schemaAttr.getEnumeration().size() > 0)
		{
			String xPathOfChild = null;
			if (schemaNode.getxPathOfChild() != null)
				xPathOfChild = (String)schemaNode.getxPathOfChild().get(0);
			if (xPathOfChild != null && "type".equals(schemaAttr.getName()))
			{
				SimpleSchemaEnum schemaEnum;
				List appInfo;
				for (Iterator iterator = schemaAttr.getEnumeration().iterator(); iterator.hasNext(); schemaEnum.setAppInfo(appInfo))
				{
					schemaEnum = (SimpleSchemaEnum)iterator.next();
					ISchemaNode propertySchemaNode = schema.getCustomSchemaNode((new StringBuilder(String.valueOf(xPathOfChild))).append(schemaEnum.getValue()).toString());
					appInfo = createAppInfo(propertySchemaNode.getxPathOfChild(), schema);
				}

			}
			attrJson.setEnums((SimpleSchemaEnum[])schemaAttr.getEnumeration().toArray(new SimpleSchemaEnum[schemaAttr.getEnumeration().size()]));
		} else
		{
			attrJson.setEnums(new SimpleSchemaEnum[0]);
		}
		return attrJson;
	}

	private List createAppInfo(List xPathOfChild, SchemaManager schema)
	{
		List itemJsons = new ArrayList();
		if (xPathOfChild != null)
		{
			ItemJson json;
			for (Iterator iterator = xPathOfChild.iterator(); iterator.hasNext(); itemJsons.add(json))
			{
				String xPath = (String)iterator.next();
				ISchemaNode schemaNode = schema.getCustomSchemaNode(xPath);
				json = createCustomItemJson(schemaNode);
			}

		}
		return itemJsons;
	}

	private ItemJson createCustomItemJson(ISchemaNode schemaNode)
	{
		ItemJson eleJson = new ItemJson();
		eleJson.setNodeType("element");
		eleJson.setName(schemaNode.getName());
		eleJson.setxPath(schemaNode.getXPath());
		eleJson.setDef(schemaNode.getDef());
		eleJson.setCustomizable(schemaNode.isCustomizable());
		eleJson.setAutoApply(schemaNode.isAutoApply());
		eleJson.setDesp(schemaNode.getAnnotation());
		eleJson.setType(schemaNode.getType());
		eleJson.setUse(schemaNode.getUse());
		eleJson.setUniqueId(uniqueId());
		eleJson.setMinOccurs(schemaNode.getMinOccurs());
		eleJson.setMaxOccurs(schemaNode.getMaxOccurs());
		return eleJson;
	}

	public Document createDocumentFromPageJson(String rootName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
		String GROUPS = "groups";
		String LISTS = "lists";
		String SWITCHES = "switches";
		String DATASOURCES = "dataSources";
		Document document = DocumentHelper.createDocument();
		Element root = createRootElement(document, rootName);
		JSONObject baseJson = pageJson.getJSONObject("base");
		for (Iterator baseIterator = baseJson.keySet().iterator(); baseIterator.hasNext();)
		{
			String label = (String)baseIterator.next();
			JSONObject itemJson = baseJson.getJSONObject(label);
			if ("element".equals(itemJson.getString("nodeType")))
			{
				Element element = root.addElement(label);
				element.setText(itemJson.getString("value"));
			} else
			{
				root.addAttribute(label, itemJson.getString("value"));
			}
		}

		JSONObject coreJson = pageJson.getJSONObject("core");
		for (Iterator coreIterator = coreJson.keySet().iterator(); coreIterator.hasNext();)
		{
			String label = (String)coreIterator.next();
			JSONObject itemJson = coreJson.getJSONObject(label);
			if ("element".equals(itemJson.getString("nodeType")))
			{
				Element element = root.addElement(label);
				element.setText(itemJson.getString("value"));
			} else
			{
				root.addAttribute(label, itemJson.getString("value"));
			}
		}

		JSONObject groupsJson = pageJson.getJSONObject("groups");
		for (Iterator groupsIterator = groupsJson.keySet().iterator(); groupsIterator.hasNext();)
		{
			String groupName = (String)groupsIterator.next();
			Element groupElement = root.addElement(groupName);
			JSONArray groupItems = groupsJson.getJSONObject(groupName).getJSONArray("fields");
			int i = 0;
			for (int size = groupItems.size(); i < size; i++)
			{
				JSONObject itemJson = groupItems.getJSONObject(i);
				Element element = groupElement.addElement(itemJson.getString("name"));
				element.setText(itemJson.getString("value"));
			}

		}

		JSONArray listsJson = pageJson.getJSONArray("lists");
		JSONObject listJson;
		String label;
		for (Iterator listsIterator = listsJson.iterator(); listsIterator.hasNext(); createListsChildElement(root, label, listJson))
		{
			listJson = (JSONObject)listsIterator.next();
			label = listJson.getString("name");
		}

		JSONObject dataSrcesJson = pageJson.getJSONObject("dataSources");
		for (Iterator dataSrcesIterator = dataSrcesJson.keySet().iterator(); dataSrcesIterator.hasNext();)
		{
			String label1 = (String)dataSrcesIterator.next();
			JSONObject itemJson = dataSrcesJson.getJSONObject(label1);
			if ("dbConnPools".equals(label1))
				createDataSourcesElement(root, label1, itemJson, true);
			else
			if ("hibernate".equals(label1))
				createDataSourcesElement(root, label1, itemJson, false);
		}

		JSONObject switchesJson = pageJson.getJSONObject("switches");
		for (Iterator switchesIterator = switchesJson.keySet().iterator(); switchesIterator.hasNext();)
		{
			String switchName = (String)switchesIterator.next();
			Element switchElement = root.addElement(switchName);
			JSONObject usableItem = switchesJson.getJSONObject(switchName).getJSONObject("usable");
			switchElement.addElement(usableItem.getString("name")).setText(usableItem.getString("value"));
			JSONArray nodeItems = switchesJson.getJSONObject(switchName).getJSONArray("nodes");
			int i = 0;
			for (int size = nodeItems.size(); i < size; i++)
			{
				JSONObject itemJson = nodeItems.getJSONObject(i);
				Element element = switchElement.addElement(itemJson.getString("name"));
				element.setText(itemJson.getString("value"));
			}

			JSONArray childItems1 = switchesJson.getJSONObject(switchName).getJSONArray("child");
			int h = 0;
			for (int size1 = childItems1.size(); h < size1; h++)
			{
				JSONObject itemJson1 = childItems1.getJSONObject(h);
				Element childEle = switchElement.addElement(itemJson1.getString("name"));
				JSONArray childItems2 = itemJson1.getJSONArray("child");
				int j = 0;
				for (int size2 = childItems2.size(); j < size2; j++)
				{
					JSONObject itemJson = childItems2.getJSONObject(j);
					Element element = childEle.addElement(itemJson.getString("name"));
					if (itemJson.containsKey("value"))
						element.setText(itemJson.getString("value"));
				}

			}

		}

		return document;
	}

	protected void createListsChildElement(Element parentEle, String label, JSONObject jsonObject)
	{
		if ("element".equals(jsonObject.getString("nodeType")))
		{
			Element element = parentEle.addElement(label);
			if (jsonObject.containsKey("value"))
			{
				element.setText(jsonObject.getString("value"));
			} else
			{
				JSONArray attrItems = jsonObject.getJSONArray("attrs");
				int i = 0;
				for (int size = attrItems.size(); i < size; i++)
				{
					JSONObject attrItemJson = attrItems.getJSONObject(i);
					element.addAttribute(attrItemJson.getString("name"), attrItemJson.getString("value"));
				}

				JSONArray nodeItems = jsonObject.getJSONArray("nodes");
				int k = 0;
				for (int size = nodeItems.size(); k < size; k++)
				{
					JSONObject nodeItemJson = nodeItems.getJSONObject(k);
					Element childEle = element.addElement(nodeItemJson.getString("name"));
					if (nodeItemJson.containsKey("attrs"))
					{
						JSONArray attrs = nodeItemJson.getJSONArray("attrs");
						int j = 0;
						for (int len = attrs.size(); j < len; j++)
						{
							JSONObject attr = attrs.getJSONObject(j);
							childEle.addAttribute(attr.getString("name"), attr.getString("value"));
						}

					}
					if (nodeItemJson.containsKey("value"))
						childEle.setText(nodeItemJson.getString("value"));
				}

				JSONArray childItems = jsonObject.getJSONArray("child");
				int f = 0;
				for (int size = childItems.size(); f < size; f++)
				{
					JSONObject childItemJson = childItems.getJSONObject(f);
					createListsChildElement(element, childItemJson.getString("name"), childItemJson);
				}

			}
		} else
		{
			parentEle.addAttribute(label, jsonObject.getString("value"));
		}
	}

	private void createDataSourcesElement(Element parentEle, String label, JSONObject itemJson, boolean beEncode)
	{
		Element labelEle = parentEle.addElement(label);
		JSONArray childItems = itemJson.getJSONArray("child");
		for (Iterator childIterator = childItems.iterator(); childIterator.hasNext();)
		{
			JSONObject childJson = (JSONObject)childIterator.next();
			Element childEle = labelEle.addElement(childJson.getString("name"));
			JSONArray attrItems = childJson.getJSONArray("attrs");
			JSONObject attrJson;
			for (Iterator attrIterator = attrItems.iterator(); attrIterator.hasNext(); childEle.addAttribute(attrJson.getString("name"), attrJson.getString("value")))
				attrJson = (JSONObject)attrIterator.next();

			JSONArray nodeItems = childJson.getJSONArray("nodes");
			String value;
			Element propertyEle;
			for (Iterator nodeIterator = nodeItems.iterator(); nodeIterator.hasNext(); propertyEle.addAttribute("value", value))
			{
				JSONObject nodeItem = (JSONObject)nodeIterator.next();
				value = nodeItem.getString("value");
				if (beEncode && "Password".equalsIgnoreCase(nodeItem.getString("name")))
				{
					String encipherVersion = childEle.attributeValue("encipherVersion");
					if ("1".equals(encipherVersion))
						value = (new EncipherAndDecipherUtils()).encode3Des(value);
					if (encipherVersion == null || "2".equals(encipherVersion))
						value = (new EncipherAndDecipherUtils()).encodeBase64(value);
				}
				propertyEle = childEle.addElement("property");
				propertyEle.addAttribute("name", nodeItem.getString("name"));
			}

		}

	}

	private boolean isSwitchItem(String name)
	{
		String as[];
		int j = (as = switches).length;
		for (int i = 0; i < j; i++)
		{
			String str = as[i];
			if (str.equals(name))
				return true;
		}

		return false;
	}

	private boolean isListItem(String name)
	{
		String as[];
		int j = (as = lists).length;
		for (int i = 0; i < j; i++)
		{
			String str = as[i];
			if (str.equals(name))
				return true;
		}

		return false;
	}

	private boolean isDataSourceItem(String name)
	{
		String as[];
		int j = (as = dataSources).length;
		for (int i = 0; i < j; i++)
		{
			String str = as[i];
			if (str.equals(name))
				return true;
		}

		return false;
	}

	private void setSwitches(String switches[])
	{
		this.switches = switches;
	}

	private void setLists(String lists[])
	{
		this.lists = lists;
	}

	private void setDataSources(String dataSources[])
	{
		this.dataSources = dataSources;
	}

	static 
	{
		xpathMap = new HashMap();
		xpathMap.put("dbConnPools", "/dbConnPools/dbConnPool");
		xpathMap.put("hibernate", "/hibernate/sessionFactory");
		xpathMap.put("paramMemorize", "/paramSources/paramSource");
		xpathMap.put("customizedTrades", "/customizedTrades/trade");
	}
}
