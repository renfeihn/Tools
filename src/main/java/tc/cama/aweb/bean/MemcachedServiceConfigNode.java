// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   MemcachedServiceConfigNode.java

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

public class MemcachedServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int sid;
	private String caches[];
	private static final String OPTIONS_NAME = "memcachedOptions";

	public MemcachedServiceConfigNode(byte contents[], int gid, int sid)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.sid = sid;
	}

	public MemcachedServiceConfigNode(String configStr)
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
		throws AfaConfigException
	{
		Element dcmEle = getElementByXPath(ConfigFileXPath.dcmServiceOptions(gid, sid, "memcachedOptions"));
		if (dcmEle == null)
			throw new AfaConfigException("��ȡ�����û������������Ϣ,��ȷ���Ƿ񴴽��˹����飡��");
		else
			return dcmEle;
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
		for (Iterator baseIterator = baseJson.keys(); baseIterator.hasNext();)
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

		Element optionsEle = root.addElement("memcachedOptions");
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

	private void setCaches(String caches[])
	{
		this.caches = caches;
	}

	public String getServiceType()
	{
		return "memcachedOptions";
	}
}
