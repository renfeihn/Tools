// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   YongLongServiceConfigNode.java

package tc.cama.aweb.bean;

import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import cn.com.agree.aweb.exception.AfaConfigException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tc.cama.aweb.utils.SchemaManager;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml.service:
//			ServiceConfigNode

public class YongLongServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int mid;
	private int sid;
	private String lists[];
	private AfaDeviceType dvcType;
	private static final String OPTIONS_NAME = "yongLongOptions";
	private static int $SWITCH_TABLE$cn$com$agree$aweb$afa4j$struct$table$AfaDeviceType[];

	public YongLongServiceConfigNode(String configStr, AfaDeviceType dvcType)
		throws AfaConfigException
	{
		super(configStr, dvcType);
		this.dvcType = dvcType;
	}

	public YongLongServiceConfigNode(byte contents[], int gid, int mid, int sid, AfaDeviceType dvcType)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.mid = mid;
		this.sid = sid;
		this.dvcType = dvcType;
	}

	protected void initArea()
	{
		setBases(new String[] {
			"description", "identifier"
		});
		setCores(new String[] {
			"workerThreads", "connPoolSize"
		});
		setLists(new String[] {
			"master", "standby"
		});
	}

	public Element getElement()
	{
		switch (dvcType.ordinal())
		{
		case 8: // '\b'
			return getElementByXPath(ConfigFileXPath.lsrServiceOptions(gid, mid, sid, "yongLongOptions"));

		case 10: // '\n'
			return getElementByXPath(ConfigFileXPath.outServiceOptions(gid, mid, sid, "yongLongOptions"));

		case 9: // '\t'
		default:
			return null;
		}
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
			if (isListItem(elementName))
			{
				BranchJson eleJson = createBranchElementJson(element, schemaNode, schema);
				pageJson.addList(eleJson);
			}
		}

	}

	public Document createDocumentFromPageJson(String serviceName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
		String LISTS = "lists";
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

		Element optionsEle = root.addElement("yongLongOptions");
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

		JSONArray listsJson = pageJson.getJSONArray("lists");
		JSONObject listJson;
		String label;
		for (Iterator listsIterator = listsJson.iterator(); listsIterator.hasNext(); createChildElement(optionsEle, label, listJson))
		{
			listJson = (JSONObject)listsIterator.next();
			label = listJson.getString("name");
		}

		return document;
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

	public void setLists(String lists[])
	{
		this.lists = lists;
	}

	public String getServiceType()
	{
		return "yongLongOptions";
	}

}