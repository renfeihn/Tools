// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   EhcacheServiceConfigNode.java

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

public class EhcacheServiceConfigNode extends ServiceConfigNode
{

	private int gid;
	private int sid;
	private String factorys[];
	private String caches[];
	private static final String OPTIONS_NAME = "ehcacheOptions";
	private static final String CACHES = "caches";
	private static final String RMIURLS = "rmiUrls";
	private static final String LISTENERFACTORY = "cacheEventListenerFactory";
	private static final String LOADERFACTORY = "bootstrapCacheLoaderFactory";
	private static Map xpathMap;

	public EhcacheServiceConfigNode(byte contents[], int gid, int sid)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.sid = sid;
	}

	public EhcacheServiceConfigNode(String configStr)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.DCMSERVICE);
	}

	protected void initArea()
	{
		setBases(new String[0]);
		setCores(new String[] {
			"diskStore"
		});
		setFactorys(new String[] {
			"cacheManagerPeerProviderFactory", "cacheManagerPeerListenerFactory"
		});
		setCaches(new String[] {
			"caches"
		});
	}

	public Element getElement()
		throws AfaConfigException
	{
		Element dcmEle = getElementByXPath(ConfigFileXPath.dcmServiceOptions(gid, sid, "ehcacheOptions"));
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
			if (isCoreItem(elementName))
			{
				ItemJson eleJson = createLeafElementJson(element, schemaNode);
				pageJson.addCoreItem(elementName, eleJson);
			} else
			if (isFactorys(elementName))
			{
				BranchJson eleJson = createFactoryElementJson(element, schemaNode, schema);
				if (schemaNode.getAttributes() != null && schemaNode.getAttributes().size() > 0)
				{
					ItemJson attrJson;
					for (Iterator iterator1 = schemaNode.getAttributes().iterator(); iterator1.hasNext(); eleJson.addAttr(attrJson))
					{
						SimpleSchemaAttribute schemaAttr = (SimpleSchemaAttribute)iterator1.next();
						attrJson = createAttrJson(element, schemaAttr);
					}

				}
				pageJson.addFactorys(elementName, eleJson);
			} else
			if (isCaches(elementName))
			{
				BranchJson branchJson = createCachesElementJson(element, schemaNode, schema);
				ISchemaNode childSchemaNode = schema.getCustomSchemaNode((String)xpathMap.get(elementName));
				BranchJson appendNode = createCustomBranchJson(childSchemaNode, schema);
				branchJson.setAppendNode(JSONObject.fromObject(appendNode));
				pageJson.addCaches(elementName, branchJson);
			}
		}

	}

	protected BranchJson createCustomBranchJson(ISchemaNode schemaNode, SchemaManager schema)
	{
		BranchJson eleJson = new BranchJson();
		String xPath = schemaNode.getXPath();
		String name = schemaNode.getName();
		eleJson.setName(name);
		eleJson.setxPath(xPath);
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
				attrJson = createCustomAttrJson(schemaAttr, xPath);
			}

		}
		List xPathOfChilds = schemaNode.getxPathOfChild();
		if (xPathOfChilds != null && xPathOfChilds.size() > 0)
		{
			for (Iterator iterator1 = xPathOfChilds.iterator(); iterator1.hasNext();)
			{
				String xPathOfChild = (String)iterator1.next();
				ISchemaNode childNode = schema.getCustomSchemaNode(xPathOfChild);
				if (childNode.getxPathOfChild() != null && childNode.getxPathOfChild().size() > 0)
				{
					if ("cacheEventListenerFactory".equals(name) || "bootstrapCacheLoaderFactory".equals(name))
					{
						BranchJson appendNode = createCustomBranchJson(childNode, schema);
						eleJson.setAppendNode(JSONObject.fromObject(appendNode));
					} else
					{
						eleJson.addChild(createCustomBranchJson(childNode, schema));
					}
				} else
				{
					ItemJson itemJson = createCustomItemJson(childNode, null);
					if ("property".equals(childNode.getName()) && ("cacheEventListenerFactory".equals(name) || "bootstrapCacheLoaderFactory".equals(name)))
						eleJson.setAppendNode(JSONObject.fromObject(itemJson));
					else
						eleJson.addNodes(itemJson);
				}
			}

		}
		return eleJson;
	}

	private BranchJson createFactoryElementJson(Element element, ISchemaNode schemaNode, SchemaManager schema)
	{
		BranchJson branchJson = new BranchJson();
		branchJson.setName(element.getName());
		branchJson.setxPath(convertPath(element.getPath()));
		branchJson.setNodeType("element");
		branchJson.setCustomizable(schemaNode.isCustomizable());
		branchJson.setAutoApply(schemaNode.isAutoApply());
		branchJson.setDesp(schemaNode.getAnnotation());
		branchJson.setUse(schemaNode.getUse());
		branchJson.setUniqueId(uniqueId());
		for (Iterator iterator = element.elements().iterator(); iterator.hasNext();)
		{
			Element child = (Element)iterator.next();
			ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
			if (isLeafNode(child) && !"rmiUrls".equals(child.getName()))
			{
				branchJson.addNodes(createLeafElementJson(child, childSchemaNode));
			} else
			{
				BranchJson childJson = createBranchElementJson(child, childSchemaNode, schema);
				if ("rmiUrls".equals(child.getName()))
				{
					ItemJson appendNode = createCustomItemJson(schema.getCustomSchemaNode((String)xpathMap.get("rmiUrls")), branchJson.getxPath());
					childJson.setAppendNode(JSONObject.fromObject(appendNode));
				}
				branchJson.addChild(childJson);
			}
		}

		return branchJson;
	}

	private BranchJson createCachesElementJson(Element element, ISchemaNode schemaNode, SchemaManager schema)
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
			ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
			if (!isLeafNode(child))
				eleJson.addChild(createCacheElementJson(child, childSchemaNode, schema));
		}

		if (schemaNode.getAttributes() != null && schemaNode.getAttributes().size() > 0)
		{
			ItemJson attrJson;
			for (Iterator iterator1 = schemaNode.getAttributes().iterator(); iterator1.hasNext(); eleJson.addAttr(attrJson))
			{
				SimpleSchemaAttribute schemaAttr = (SimpleSchemaAttribute)iterator1.next();
				attrJson = createAttrJson(element, schemaAttr);
			}

		}
		return eleJson;
	}

	private BranchJson createCacheElementJson(Element element, ISchemaNode schemaNode, SchemaManager schema)
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
			ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
			if (isLeafNode(child) && !"cacheEventListenerFactory".equals(child.getName()) && !"bootstrapCacheLoaderFactory".equals(child.getName()))
				eleJson.addNodes(createLeafElementJson(child, childSchemaNode));
			else
			if ("cacheEventListenerFactory".equalsIgnoreCase(child.getName()) || "bootstrapCacheLoaderFactory".equalsIgnoreCase(child.getName()))
				eleJson.addChild(createBranchElementJson(child, childSchemaNode, schema));
		}

		if (schemaNode.getAttributes() != null && schemaNode.getAttributes().size() > 0)
		{
			ItemJson attrJson;
			for (Iterator iterator1 = schemaNode.getAttributes().iterator(); iterator1.hasNext(); eleJson.addAttr(attrJson))
			{
				SimpleSchemaAttribute schemaAttr = (SimpleSchemaAttribute)iterator1.next();
				attrJson = createAttrJson(element, schemaAttr);
			}

		}
		return eleJson;
	}

	public Document createDocumentFromPageJson(String serviceName, JSONObject pageJson)
	{
		String BASE = "base";
		String CORE = "core";
		String FACTORYS = "factorys";
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

		Element optionsEle = root.addElement("ehcacheOptions");
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

		JSONObject factorysJson = pageJson.getJSONObject("factorys");
		for (Iterator factorysIterator = factorysJson.keySet().iterator(); factorysIterator.hasNext();)
		{
			String factoryName = (String)factorysIterator.next();
			Element factoryElement = optionsEle.addElement(factoryName);
			JSONArray attrs = factorysJson.getJSONObject(factoryName).getJSONArray("attrs");
			int h = 0;
			for (int size = attrs.size(); h < size; h++)
			{
				JSONObject itemJson = attrs.getJSONObject(h);
				String name = itemJson.getString("name");
				String value = itemJson.getString("value");
				factoryElement.addAttribute(name, value);
			}

			JSONArray nodeItems = factorysJson.getJSONObject(factoryName).getJSONArray("nodes");
			int i = 0;
			for (int size = nodeItems.size(); i < size; i++)
			{
				JSONObject itemJson = nodeItems.getJSONObject(i);
				String name = itemJson.getString("name");
				Element element = factoryElement.addElement(name);
				element.setText(itemJson.getString("value"));
				if ("cacheManagerPeerProviderFactory".equals(factoryName))
				{
					JSONArray rmiurlsItems = factorysJson.getJSONObject(factoryName).getJSONArray("child");
					int j = 0;
					for (int len = rmiurlsItems.size(); i < len; i++)
					{
						String rmiurlsname = rmiurlsItems.getJSONObject(j).getString("name");
						Element rmiurlsElement = factoryElement.addElement(rmiurlsname);
						JSONArray rmiurls = rmiurlsItems.getJSONObject(j).getJSONArray("nodes");
						int k = 0;
						for (int len2 = rmiurls.size(); k < len2; k++)
						{
							JSONObject rmiurl = rmiurls.getJSONObject(k);
							String rmiurlname = rmiurl.getString("name");
							Element rmiurlElement = rmiurlsElement.addElement(rmiurlname);
							rmiurlElement.setText(rmiurl.getString("value"));
						}

					}

				}
			}

		}

		JSONObject cachesJson = pageJson.getJSONObject("caches");
		for (Iterator cachesIterator = cachesJson.keySet().iterator(); cachesIterator.hasNext();)
		{
			String lable = (String)cachesIterator.next();
			Element cachesEle = optionsEle.addElement(lable);
			JSONObject branchJson = cachesJson.getJSONObject(lable);
			JSONArray cacheArray = branchJson.getJSONArray("child");
			int i = 0;
			for (int cLen = cacheArray.size(); i < cLen; i++)
			{
				JSONObject cacheJson = cacheArray.getJSONObject(i);
				Element cacheEle = cachesEle.addElement(cacheJson.getString("name"));
				JSONArray attrs = cacheJson.getJSONArray("attrs");
				int j = 0;
				for (int aLen = attrs.size(); j < aLen; j++)
				{
					JSONObject attrJson = attrs.getJSONObject(j);
					cacheEle.addAttribute(attrJson.getString("name"), attrJson.getString("value"));
				}

				JSONArray childs = cacheJson.getJSONArray("child");
				createCacheFactoryFromJson(cacheEle, childs);
			}

		}

		return document;
	}

	private void createCacheFactoryFromJson(Element parentEle, JSONArray jsonArray)
	{
		int i = 0;
		for (int len = jsonArray.size(); i < len; i++)
		{
			JSONObject facJson = jsonArray.getJSONObject(i);
			Element facEle = parentEle.addElement(facJson.getString("name"));
			JSONArray attrs = facJson.getJSONArray("attrs");
			int j = 0;
			for (int aLen = attrs.size(); j < aLen; j++)
			{
				JSONObject attrJson = attrs.getJSONObject(j);
				facEle.addAttribute(attrJson.getString("name"), attrJson.getString("value"));
			}

			JSONArray nodes = facJson.getJSONArray("nodes");
			int k = 0;
			for (int cLen = nodes.size(); k < cLen; k++)
			{
				JSONObject nodeJson = nodes.getJSONObject(k);
				Element propEle = facEle.addElement("property");
				propEle.addAttribute("name", nodeJson.getString("name"));
				propEle.addAttribute("value", nodeJson.getString("value"));
			}

		}

	}

	private boolean isFactorys(String elementName)
	{
		String as[];
		int j = (as = factorys).length;
		for (int i = 0; i < j; i++)
		{
			String str = as[i];
			if (str.equals(elementName))
				return true;
		}

		return false;
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

	private void setFactorys(String factorys[])
	{
		this.factorys = factorys;
	}

	private void setCaches(String caches[])
	{
		this.caches = caches;
	}

	public String getServiceType()
	{
		return "ehcacheOptions";
	}

	static 
	{
		xpathMap = new HashMap();
		xpathMap.put("caches", "/caches/cache");
		xpathMap.put("rmiUrls", "/rmiUrls/rmiUrl");
		xpathMap.put("cacheEventListenerFactory", "/caches/cache/cacheEventListenerFactory");
		xpathMap.put("bootstrapCacheLoaderFactory", "/caches/cache/bootstrapCacheLoaderFactory");
	}
}
