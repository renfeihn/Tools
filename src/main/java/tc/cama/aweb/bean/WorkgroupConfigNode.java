// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   WorkgroupConfigNode.java

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
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.SchemaManager;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml:
//			ConfigNodeSupport, ConfigFileXPath

public class WorkgroupConfigNode extends ConfigNodeSupport
{

	private int gid;
	private String switches[];

	public WorkgroupConfigNode(byte configContents[], int gid)
		throws AfaConfigException
	{
		super(configContents);
		this.gid = gid;
	}

	public WorkgroupConfigNode(String configStr)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.WORKGROUP);
	}

	protected void initArea()
	{
		setBases(new String[] {
			"description", "isolation"
		});
		setCores(new String[] {
			"startupMode", "jvmOptions", "startTimeout", "stopTimeout", "reportInterval"
		});
		setGroups(new String[0]);
		setSwitches(new String[0]);
	}

	public Element getElement()
		throws AfaConfigException
	{
		Element wkgEle = getElementByXPath(ConfigFileXPath.workgroup(gid));
		if (wkgEle == null)
			throw new AfaConfigException("��ȡ�����ù��������Ϣ����ȷ���Ƿ��ѱ�ɾ��");
		else
			return wkgEle;
	}

	public PageJson getPageJson(SchemaManager schema)
		throws AfaConfigException
	{
		PageJson pageJson = PageJson.allocate();
		setBaseAttribute(getElement(), pageJson, schema);
		iteratorElement(getElement(), pageJson, schema);
		return pageJson;
	}

	public Document createDocumentFromPageJson(String rootName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
		String GROUPS = "groups";
		String SWITCHES = "switches";
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

		JSONObject switchesJson = pageJson.getJSONObject("switches");
		for (Iterator switchesIterator = switchesJson.keySet().iterator(); switchesIterator.hasNext();)
		{
			String switchName = (String)switchesIterator.next();
			Element switchElement = root.addElement(switchName);
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
				groupJson.setDesp(schemaNode.getAnnotation());
				groupJson.setxPath(convertPath(element.getPath()));
				groupJson.setUniqueId(uniqueId());
				List childs = element.elements();
				ItemJson childJson;
				for (Iterator iterator1 = childs.iterator(); iterator1.hasNext(); groupJson.addItem(childJson))
				{
					Element child = (Element)iterator1.next();
					ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
					childJson = createLeafElementJson(child, childSchemaNode);
				}

			} else
			if (isSwitchItem(elementName))
			{
				SwitchJson switchJson = pageJson.switchs(elementName);
				switchJson.setDesp(schemaNode.getAnnotation());
				switchJson.setxPath(convertPath(element.getPath()));
				switchJson.setUniqueId(uniqueId());
				List eleList = element.elements();
				for (Iterator iterator2 = eleList.iterator(); iterator2.hasNext();)
				{
					Element ele = (Element)iterator2.next();
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
							for (Iterator iterator3 = childs.iterator(); iterator3.hasNext();)
							{
								Element child = (Element)iterator3.next();
								ItemJson childJson = getItemJson(child, schema);
								List attrs = child.attributes();
								if (attrs.size() > 0)
								{
									JSONObject json = JSONObject.fromObject(childJson);
									json.remove("value");
									Attribute attr;
									for (Iterator iterator4 = attrs.iterator(); iterator4.hasNext(); json.put(attr.getName(), attr.getText()))
										attr = (Attribute)iterator4.next();

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
}
