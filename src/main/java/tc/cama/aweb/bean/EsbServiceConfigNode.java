// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   EsbServiceConfigNode.java

package tc.cama.aweb.bean;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import cn.com.agree.aweb.exception.AfaConfigException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tc.cama.aweb.utils.SchemaManager;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml.service:
//			ServiceConfigNode

public class EsbServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int mid;
	private int sid;
	private static final String OPTIONS_NAME = "esbOptions";
	private static final String ADDRESSES = "addresses";
	private static Map xpathMap;

	public EsbServiceConfigNode(String configStr, AfaDeviceType dvcType)
		throws AfaConfigException
	{
		super(configStr, dvcType);
	}

	public EsbServiceConfigNode(byte contents[], int gid, int mid, int sid)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.mid = mid;
		this.sid = sid;
	}

	protected void initArea()
	{
		setBases(new String[] {
			"description", "identifier"
		});
		setCores(new String[] {
			"appName", "interfaceClazz", "group", "version"
		});
		setGroups(new String[] {
			"addresses"
		});
	}

	public Element getElement()
	{
		return getElementByXPath(ConfigFileXPath.outServiceOptions(gid, mid, sid, "esbOptions"));
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
			if (isGroupItem(elementName))
			{
				PageJson.GroupJson groupJson = pageJson.group(elementName);
				groupJson.setDesp(schemaNode.getAnnotation());
				groupJson.setxPath(convertPath(element.getPath()));
				groupJson.setUniqueId(uniqueId());
				ISchemaNode parentchemaNode = schema.getSchemaNode((String)xpathMap.get(elementName));
				ItemJson addrItem = createCustomItemJson(parentchemaNode, convertPath(element.getPath()));
				groupJson.setAppendNode(JSONObject.fromObject(addrItem));
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

	public Document createDocumentFromPageJson(String serviceName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
		String GROUPS = "groups";
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

		Element optionsEle = root.addElement("esbOptions");
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

		JSONObject groupsJson = pageJson.getJSONObject("groups");
		for (Iterator groupsIterator = groupsJson.keySet().iterator(); groupsIterator.hasNext();)
		{
			String groupName = (String)groupsIterator.next();
			Element groupElement = optionsEle.addElement(groupName);
			JSONArray groupItems = groupsJson.getJSONObject(groupName).getJSONArray("fields");
			int i = 0;
			for (int size = groupItems.size(); i < size; i++)
			{
				JSONObject itemJson = groupItems.getJSONObject(i);
				Element element = groupElement.addElement(itemJson.getString("name"));
				for (int j = 0; j < itemJson.getJSONArray("attrs").size(); j++)
				{
					String name = itemJson.getJSONArray("attrs").getJSONObject(j).getString("name");
					String value = itemJson.getJSONArray("attrs").getJSONObject(j).getString("value");
					element.addAttribute(name, value);
				}

			}

		}

		return document;
	}

	public String getServiceType()
	{
		return "esbOptions";
	}

	static 
	{
		xpathMap = new HashMap();
		xpathMap.put("addresses", "/esbOptions/addresses/address");
	}
}
