// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   ISCServiceConfigNode.java

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

public class ISCServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int mid;
	private int sid;
	private AfaDeviceType dvcType;
	private static final String OPTIONS_NAME = "iscOptions";
	private String switches[];
	private static int $SWITCH_TABLE$cn$com$agree$aweb$afa4j$struct$table$AfaDeviceType[];

	public ISCServiceConfigNode(byte contents[], int gid, int mid, int sid, AfaDeviceType dvcType)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.mid = mid;
		this.sid = sid;
		this.dvcType = dvcType;
	}

	public ISCServiceConfigNode(String configStr, AfaDeviceType dvcType)
		throws AfaConfigException
	{
		super(configStr, dvcType);
		this.dvcType = dvcType;
	}

	protected void initArea()
	{
		setBases(new String[0]);
		setSwitches(new String[] {
			"recvQueue"
		});
	}

	public Element getElement()
	{
		switch (dvcType.ordinal())
		{
		case 8: // '\b'
			return getElementByXPath(ConfigFileXPath.lsrServiceOptions(gid, mid, sid, "iscOptions"));

		case 10: // '\n'
			return getElementByXPath(ConfigFileXPath.outServiceOptions(gid, mid, sid, "iscOptions"));

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
			if (isBaseItem(elementName))
			{
				ItemJson eleJson = createLeafElementJson(element, schemaNode);
				pageJson.addBaseItem(elementName, eleJson);
			} else
			if (isSwitchItem(elementName))
			{
				SwitchJson switchJson = pageJson.switchs(elementName);
				switchJson.setDesp(schemaNode.getAnnotation());
				switchJson.setxPath(convertPath(element.getPath()));
				switchJson.setUniqueId(uniqueId());
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
						if (isLeafNode(ele))
						{
							switchJson.addNodes(itemJson);
						} else
						{
							JSONObject jsonObject = JSONObject.fromObject(itemJson);
							jsonObject.remove("value");
							JSONArray childArr = new JSONArray();
							List childs = ele.elements();
							ItemJson childJson;
							for (Iterator iterator2 = childs.iterator(); iterator2.hasNext(); childArr.add(childJson))
							{
								Element child = (Element)iterator2.next();
								childJson = getItemJson(child, schema);
							}

							jsonObject.put("child", childArr);
							switchJson.addChild(jsonObject);
						}
					}
				}

			}
		}

	}

	public Document createDocumentFromPageJson(String serviceName, JSONObject pageJson)
	{
		String BASE = "base";
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

		Element optionsEle = root.addElement("iscOptions");
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
						element.setText(itemJson.getString("value"));
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
		return "iscOptions";
	}

}
