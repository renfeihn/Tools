// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   WebSocketServiceConfigNode.java

package tc.cama.aweb.bean;

import java.util.Iterator;
import java.util.List;

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

public class WebSocketServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int mid;
	private int sid;
	private static final String OPTIONS_NAME = "websocketOptions";

	public WebSocketServiceConfigNode(byte contents[], int gid, int mid, int sid)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.mid = mid;
		this.sid = sid;
	}

	public WebSocketServiceConfigNode(String configStr)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.OUTSERVICE);
	}

	protected void initArea()
	{
		setBases(new String[0]);
		setCores(new String[] {
			"port", "tradePort", "ioEventThreads", "responseTimeout", "tradesToInvoke"
		});
	}

	public Element getElement()
	{
		return getElementByXPath(ConfigFileXPath.outServiceOptions(gid, mid, sid, "websocketOptions"));
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
				if (isLeafNode(element))
				{
					pageJson.addCoreItem(elementName, eleJson);
				} else
				{
					JSONObject jsonObject = JSONObject.fromObject(eleJson);
					jsonObject.remove("value");
					JSONArray childArr = new JSONArray();
					List childs = element.elements();
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
					pageJson.addCoreItem(elementName, jsonObject);
				}
			}
		}

	}

	public Document createDocumentFromPageJson(String serviceName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
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

		Element optionsEle = root.addElement("websocketOptions");
		JSONObject coreJson = pageJson.getJSONObject("core");
		for (Iterator coreIterator = coreJson.keySet().iterator(); coreIterator.hasNext();)
		{
			String label = (String)coreIterator.next();
			JSONObject itemJson = coreJson.getJSONObject(label);
			if ("element".equals(itemJson.getString("nodeType")))
			{
				Element element = optionsEle.addElement(label);
				if (itemJson.containsKey("value"))
					element.setText(itemJson.getString("value"));
				else
				if (itemJson.containsKey("child"))
				{
					JSONArray childItems = itemJson.getJSONArray("child");
					int i = 0;
					for (int size = childItems.size(); i < size; i++)
					{
						JSONObject childItemJson = childItems.getJSONObject(i);
						Element childEle = element.addElement(childItemJson.getString("name"));
						if (childItemJson.containsKey("value"))
						{
							childEle.setText(childItemJson.getString("value"));
						} else
						{
							childEle.addAttribute("mc", childItemJson.getString("mc"));
							childEle.addAttribute("tc", childItemJson.getString("tc"));
						}
					}

				}
			} else
			{
				optionsEle.addAttribute(label, itemJson.getString("value"));
			}
		}

		return document;
	}

	public String getServiceType()
	{
		return "websocketOptions";
	}
}
