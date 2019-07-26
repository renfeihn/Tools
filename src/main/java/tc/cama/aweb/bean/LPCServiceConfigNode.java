// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   LPCServiceConfigNode.java

package tc.cama.aweb.bean;

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
import tc.cama.aweb.utils.SchemaManager;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml.service:
//			ServiceConfigNode

public class LPCServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int mid;
	private int sid;
	private String switches[];
	private static final String OPTIONS_NAME = "lpcOptions";
	private static final String FLOWCONTROL = "flowControl";
	private static Map xpathMap;

	public LPCServiceConfigNode(byte contents[], int gid, int mid, int sid)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.mid = mid;
		this.sid = sid;
	}

	public LPCServiceConfigNode(String configStr)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.LSRSERVICE);
	}

	protected void initArea()
	{
		setBases(new String[0]);
		setCores(new String[] {
			"identifier"
		});
		setSwitches(new String[] {
			"flowControl"
		});
	}

	public Element getElement()
	{
		return getElementByXPath(ConfigFileXPath.lsrServiceOptions(gid, mid, sid, "lpcOptions"));
	}

	public PageJson getPageJson(SchemaManager schema)
	{
		PageJson pageJson = PageJson.allocate();
		iteratorElement(getElement(), pageJson, schema);
		return pageJson;
	}

	public void iteratorElement(Element parent, PageJson pageJson, SchemaManager schema)
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
				for (Iterator iterator1 = eleList.iterator(); iterator1.hasNext();)
				{
					Element ele = (Element)iterator1.next();
					if (eleList.indexOf(ele) == 0)
					{
						ItemJson usable = getItemJson(ele, schema);
						switchJson.setUsable(usable);
					} else
					{
						ItemJson itemJson = getItemJson(ele, schema);
						if (isLeafNode(ele) && !"whitelist".equals(ele.getName()))
						{
							switchJson.addNodes(itemJson);
						} else
						{
							JSONObject jsonObject = JSONObject.fromObject(itemJson);
							jsonObject.remove("value");
							JSONArray childArr = new JSONArray();
							List childs = ele.elements();
							for (Iterator iterator2 = childs.iterator(); iterator2.hasNext();)
							{
								Element child = (Element)iterator2.next();
								ItemJson childJson = getItemJson(child, schema);
								List attrs = child.attributes();
								if (attrs.size() > 0)
								{
									JSONObject json = JSONObject.fromObject(childJson);
									json.remove("value");
									Attribute attr;
									for (Iterator iterator3 = attrs.iterator(); iterator3.hasNext(); json.put(attr.getName(), attr.getText()))
										attr = (Attribute)iterator3.next();

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

	private JSONObject createCustomJson(ISchemaNode schemaNode, SchemaManager schema, String parentXPath)
	{
		JSONObject json = null;
		if (((String)xpathMap.get("flowControl")).equals(schemaNode.getXPath()))
		{
			json = JSONObject.fromObject(createCustomItemJson(schemaNode, parentXPath));
			json.remove("value");
			json.put("mc", "");
			json.put("tc", "");
		}
		return json;
	}

	public Document createDocumentFromPageJson(String serviceName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
		String SWITCHES = "switches";
		Document document = DocumentHelper.createDocument();
		Element root = createRootElement(document, serviceName);
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

		Element optionsEle = root.addElement("lpcOptions");
		JSONObject coreJson = pageJson.getJSONObject("core");
		for (Iterator coreIterator = coreJson.keySet().iterator(); coreIterator.hasNext();)
		{
			String label = (String)coreIterator.next();
			JSONObject itemJson = coreJson.getJSONObject(label);
			if ("element".equals(itemJson.getString("nodeType")))
			{
				Element element = optionsEle.addElement(label);
				element.setText(itemJson.getString("value"));
			} else
			{
				optionsEle.addAttribute(label, itemJson.getString("value"));
			}
		}

		JSONObject switchesJson = pageJson.getJSONObject("switches");
		for (Iterator switchesIterator = switchesJson.keySet().iterator(); switchesIterator.hasNext();)
		{
			String switchName = (String)switchesIterator.next();
			Element switchElement = optionsEle.addElement(switchName);
			JSONObject usableItem = switchesJson.getJSONObject(switchName).getJSONObject("usable");
			switchElement.addElement(usableItem.getString("name")).setText(usableItem.getString("value"));
			JSONArray nodeItems = switchesJson.getJSONObject(switchName).getJSONArray("nodes");
			int l = 0;
			for (int size = nodeItems.size(); l < size; l++)
			{
				JSONObject itemJson = nodeItems.getJSONObject(l);
				Element element = switchElement.addElement(itemJson.getString("name"));
				element.setText(itemJson.getString("value"));
			}

			JSONArray childItems1 = switchesJson.getJSONObject(switchName).getJSONArray("child");
			int i = 0;
			for (int size1 = childItems1.size(); i < size1; i++)
			{
				JSONObject itemJson1 = childItems1.getJSONObject(i);
				Element childEle = switchElement.addElement(itemJson1.getString("name"));
				JSONArray childItems2 = itemJson1.getJSONArray("child");
				int j = 0;
				for (int size2 = childItems2.size(); j < size2; j++)
				{
					JSONObject itemJson = childItems2.getJSONObject(j);
					Element element = childEle.addElement(itemJson.getString("name"));
					if (itemJson.containsKey("value"))
					{
						element.setText(itemJson.getString("value"));
					} else
					{
						element.addAttribute("mc", itemJson.getString("mc"));
						element.addAttribute("tc", itemJson.getString("tc"));
					}
				}

			}

		}

		return document;
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

	private void setSwitches(String switches[])
	{
		this.switches = switches;
	}

	public String getServiceType()
	{
		return "lpcOptions";
	}

	static 
	{
		xpathMap = new HashMap();
		xpathMap.put("flowControl", "/whitelist/trade");
	}
}
