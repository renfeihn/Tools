// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   RedisServiceConfigNode.java

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

public class RedisServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int sid;
	private String caches[];
	private static final String OPTIONS_NAME = "redisOptions";

	public RedisServiceConfigNode(byte contents[], int gid, int sid)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.sid = sid;
	}

	public RedisServiceConfigNode(String configStr)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.DCMSERVICE);
	}

	protected void initArea()
	{
		setBases(new String[0]);
		setCaches(new String[] {
			"caches"
		});
	}

	public Element getElement()
	{
		return getElementByXPath(ConfigFileXPath.dcmServiceOptions(gid, sid, "redisOptions"));
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
			if (isCaches(elementName))
			{
				BranchJson branchJson = createBranchElementJson(element, schemaNode, schema);
				pageJson.addCaches(elementName, branchJson);
			}
		}

	}

	public Document createDocumentFromPageJson(String serviceName, JSONObject pageJson)
	{
		String BASE = "base";
		String CACHES = "caches";
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

		Element optionsEle = root.addElement("redisOptions");
		Element cachesEle = optionsEle.addElement("caches");
		JSONObject cachesJson = pageJson.getJSONObject("caches").getJSONObject("caches");
		JSONArray cachesArray = cachesJson.getJSONArray("child");
		JSONObject cacheJson;
		String label;
		for (Iterator cachesIterator = cachesArray.iterator(); cachesIterator.hasNext(); createChildElement(cachesEle, label, cacheJson))
		{
			cacheJson = (JSONObject)cachesIterator.next();
			label = cacheJson.getString("name");
		}

		return document;
	}

	private boolean isCaches(String elementName)
	{
		String as[];
		int j = (as = caches).length;
		for (int i = 0; i < j; i++)
		{
			String string = as[i];
			if (string.equals(elementName))
				return true;
		}

		return false;
	}

	public void setCaches(String caches[])
	{
		this.caches = caches;
	}

	public String getServiceType()
	{
		return "redisOptions";
	}
}
