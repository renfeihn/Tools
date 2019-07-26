// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   SchemaConfGenerator.java

package tc.cama.aweb.utils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.aweb.util.AfaCommonUtil;
import net.sf.json.JSONArray;
import tc.cama.aweb.bean.AfaDeviceType;
import tc.cama.aweb.bean.ConfigFileXPath;
import tc.cama.aweb.bean.SimpleSchemaEnum;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xsd:
//			SchemaLabels, SimpleSchemaEnum

public class SchemaConfGenerator
	implements SchemaLabels
{

	private HashMap refMap;
	private HashMap typeMap;
	private HashMap platMap;
	private static final String SEPERATOR = "/";
	private static final String TARGETNAMESPACE = "targetNamespace";
	private static final String WORKGROUP_Path = "//ns:workgroup";
	private static final String LSR_Path = "//ns:lsr";
	private static final String OUT_Path = "//ns:out";
	private static final String SVC_Path = "//ns:svc";
	private static final String DCM_Path = "//ns:dcm";
	private static final String SERVICE_Path = "//ns:service";
	private static final String DBCONNPOOL_Path = "//ns:dbConnPool";
	private static final String SESSIONFACTORY_Path = "//ns:sessionFactory";
	private static final String TASKS = "tasks";
	private static final String TASK = "task";
	private static final String SOCKETOPTIONS = "socketOptions";
	private static final String CODEC = "codec";
	private static final String PROTOCOL = "protocol";
	private static final List CACHE_LIST = Arrays.asList(new String[] {
		"cacheEventListenerFactory", "bootstrapCacheLoaderFactory"
	});
	private Element rootElement;
	private String nameSpaceURI;
	private static int $SWITCH_TABLE$cn$com$agree$aweb$afa4j$struct$table$AfaDeviceType[];
	private static int $SWITCH_TABLE$cn$com$agree$afa$core$ModuleType[];

	public SchemaConfGenerator(Element root)
	{
		refMap = new HashMap();
		typeMap = new HashMap();
		platMap = new HashMap();
		rootElement = root;
		nameSpaceURI = root.attributeValue("targetNamespace");
		doInit();
	}

	private void doInit()
	{
		parseRef(rootElement.selectNodes("xs:element[@name!='platform']"));
		parseType(rootElement.selectNodes("xs:complexType"));
		parsePlat();
	}

	private void parsePlat()
	{
		Element platEle;
		for (Iterator iterator = PLAT_XPATH_LIST.iterator(); iterator.hasNext(); platMap.put(platEle.getName(), (Element)platEle.clone()))
		{
			String xPath = (String)iterator.next();
			Element element = (Element)rootElement.selectSingleNode(xPath);
			platEle = createConfigElementBySchema(element);
			iteratorElement(element, platEle);
		}

	}

	private void parseRef(List refs)
	{
		if (refs == null || refs.size() == 0)
			return;
		for (Iterator iterator = refs.iterator(); iterator.hasNext();)
		{
			Element ref = (Element)iterator.next();
			if (!refMap.containsKey(ref.attributeValue("name")))
			{
				Element refEle = createConfigElementBySchema(ref);
				iteratorElement(ref, refEle);
				refMap.put(refEle.getName(), (Element)refEle.clone());
			}
		}

	}

	private void parseType(List types)
	{
		if (types == null || types.size() == 0)
			return;
		for (Iterator iterator = types.iterator(); iterator.hasNext();)
		{
			Element type = (Element)iterator.next();
			if (!typeMap.containsKey(convertTypeName(type.attributeValue("name"))))
			{
				Element typeEle = createConfigElementBySchema(type);
				iteratorElement(type, typeEle);
				typeMap.put(typeEle.getName(), (Element)typeEle.clone());
			}
		}

	}

	private void iteratorElement(Element element, Element parentEle)
	{
		List elements = null;
		Boolean isProperty = Boolean.valueOf(false);
		if (element.attributeValue("name") != null && CACHE_LIST.contains(element.attributeValue("name")))
		{
			isProperty = Boolean.valueOf(true);
			elements = element.selectNodes("xs:complexType/xs:sequence/xs:element/xs:annotation/xs:appinfo/xs:element");
		} else
		{
			elements = element.selectNodes("xs:complexType/xs:sequence/xs:element");
			if (elements == null || elements.size() == 0)
				elements = element.selectNodes("xs:sequence/xs:element");
		}
		if (elements != null && elements.size() > 0)
		{
			for (Iterator iterator = elements.iterator(); iterator.hasNext();)
			{
				Element e = (Element)iterator.next();
				Element node;
				if (isProperty.booleanValue())
					node = createPropertyElementBySchema(e);
				else
					node = createConfigElementBySchema(e);
				if (node != null)
				{
					iteratorElement(e, node);
					parentEle.add((Element)node.clone());
				}
			}

		}
	}

	private Element createPropertyElementBySchema(Element element)
	{
		Element confEle = DocumentHelper.createDocument().addElement("property", nameSpaceURI);
		confEle.addAttribute("name", element.attributeValue("name"));
		confEle.addAttribute("value", getDefaultValue(element));
		return confEle;
	}

	private Element createConfigElementBySchema(Element element)
	{
		String name = element.attributeValue("name");
		if ("rmiUrl".equals(name))
			return null;
		String value = getDefaultValue(element);
		String ref = element.attributeValue("ref");
		String type = element.attributeValue("type");
		List attrElements = element.selectNodes("xs:complexType/xs:attribute");
		if (attrElements == null || attrElements.size() == 0)
			attrElements = element.selectNodes("xs:attribute");
		if (TYPE_LIST.contains(name))
			name = convertTypeName(name);
		Element confEle = null;
		if (name != null)
			confEle = DocumentHelper.createDocument().addElement(name, nameSpaceURI);
		if (value != null)
			confEle.setText(value);
		if (attrElements != null)
		{
			Element attr;
			for (Iterator iterator = attrElements.iterator(); iterator.hasNext(); confEle.addAttribute(attr.attributeValue("name"), getDefaultValue(attr) == null ? "" : getDefaultValue(attr)))
				attr = (Element)iterator.next();

		}
		if (ref != null)
		{
			if (!refMap.containsKey(ref))
			{
				Element schemaEle = (Element)rootElement.selectSingleNode((new StringBuilder("xs:element[@name='")).append(ref).append("']").toString());
				Element refEle = createConfigElementBySchema(schemaEle);
				iteratorElement(schemaEle, refEle);
				refMap.put(ref, (Element)refEle.clone());
			}
			return (Element)refMap.get(ref);
		}
		if (type != null && TYPE_LIST.contains(type))
		{
			if (!typeMap.containsKey(convertTypeName(type)))
			{
				Element schemaEle = (Element)rootElement.selectSingleNode((new StringBuilder("xs:complexType[@name='")).append(type).append("']").toString());
				Element typeEle = createConfigElementBySchema(schemaEle);
				iteratorElement(schemaEle, typeEle);
				typeMap.put(convertTypeName(type), (Element)typeEle.clone());
			}
			return (Element)typeMap.get(convertTypeName(type));
		} else
		{
			return confEle;
		}
	}

	private String getDefaultValue(Element element)
	{
		return element.attributeValue("default") == null ? null : element.attributeValue("default");
	}

	private String convertTypeName(String tempName)
	{
		if (tempName.startsWith("lsrType"))
			return tempName.replace("lsrType", "lsr");
		if (tempName.startsWith("outType"))
			return tempName.replace("outType", "out");
		if (tempName.startsWith("svcType"))
			return tempName.replace("svcType", "svc");
		if (tempName.startsWith("dcmType"))
			return tempName.replace("dcmType", "dcm");
		if (tempName.startsWith("applogType"))
			return tempName.replace("applogType", "applog");
		else
			return "";
	}

	public Element get(AfaDeviceType dvcType, boolean isComponent)
	{
		if (dvcType == null)
			return null;
		Element element = (Element)platMap.get(dvcType.getName());
		if (element == null && dvcType != null)
		{
			element = (Element)typeMap.get(dvcType.getName());
			if (element == null)
			{
				element = (Element)refMap.get(dvcType.getName());
				if (element == null)
					return null;
			}
		}
		switch (dvcType)
		{
		case PLATFORM: // '\001'
			element = getPlatformNode(element);
			break;

		case WORKGROUP: // '\002'
			element = getWorkgroupNode(element, isComponent);
			break;

		case LSR: // '\007'
			element = getLsrNode(element);
			break;

		case OUT: // '\t'
			element = getOutNode(element);
			break;

		case SVC: // '\004'
			element = getSvcNode(element);
			break;

		case DCM: // '\005'
			element = getDcmNode(element);
			break;
		}
		return element;
	}

	public Element get(AfaDeviceType dvcType, String serviceType)
	{
		Element options = (Element)refMap.get(serviceType);
		if (options == null)
			return null;
		Element module = null;
		Element service = null;
		switch (dvcType)
		{
		case LSRSERVICE: // '\b'
			module = (Element)typeMap.get(AfaDeviceType.LSR.getName());
			service = getLsrServiceNode(module, options);
			AfaCommonUtil.adjustTagPosition(serviceType, service);
			break;

		case OUTSERVICE: // '\n'
			module = (Element)typeMap.get(AfaDeviceType.OUT.getName());
			service = getOutServiceNode(module, options);
			break;

		case DCMSERVICE: // '\006'
			module = (Element)typeMap.get(AfaDeviceType.DCM.getName());
			service = getDcmServiceNode(module, options);
			break;
		}
		return service;
	}

	private Element getPlatformNode(Element element)
	{
		Document document = ConfigFileXPath.platformXML(element);
		Element workgroup = selectSingleElement(document, "//ns:workgroup");
		if (workgroup != null)
			workgroup.getParent().remove(workgroup);
		return document.getRootElement();
	}

	private Element getWorkgroupNode(Element element, boolean isComponent)
	{
		Document document = ConfigFileXPath.workgroupXml(element);
		Element workgroup = selectSingleElement(document, "//ns:workgroup");
		Element lsr = selectSingleElement(document, "//ns:lsr");
		Element out = selectSingleElement(document, "//ns:out");
		Element svc = selectSingleElement(document, "//ns:svc");
		Element dcm = selectSingleElement(document, "//ns:dcm");
		if (lsr != null)
			lsr.getParent().remove(lsr);
		if (out != null)
			out.getParent().remove(out);
		if (svc != null)
		{
			Element parentEle = svc.getParent();
			int index = parentEle.indexOf(svc);
			parentEle.remove(svc);
			if (!isComponent)
				parentEle.content().add(index, (Element)get(AfaDeviceType.SVC, false).clone());
		}
		if (dcm != null)
		{
			Element parentEle = dcm.getParent();
			int index = parentEle.indexOf(dcm);
			parentEle.remove(dcm);
			if (!isComponent && get(AfaDeviceType.DCM, false) != null)
				parentEle.content().add(index, (Element)get(AfaDeviceType.DCM, false).clone());
		}
		return workgroup;
	}

	private Element getLsrNode(Element element)
	{
		Document document = ConfigFileXPath.lsrXml(element);
		Element service = selectSingleElement(document, "//ns:service");
		if (service != null)
			service.getParent().remove(service);
		return selectSingleElement(document, "//ns:lsr");
	}

	private Element getLsrServiceNode(Element module, Element options)
	{
		Document document = ConfigFileXPath.lsrXml(module);
		Element service = selectSingleElement(document, "//ns:service");
		if ("socketOptions".equals(options.getName()))
		{
			Element codecEle = options.element("codec");
			if (codecEle != null)
			{
				Element optionsEle = codecEle.element("protocol");
				if (optionsEle != null)
					codecEle.remove(optionsEle);
			}
		} else
		if ("tasks".equals(options.getName()))
		{
			Element taskEle = options.element("task");
			if (taskEle != null)
				taskEle.attribute("id").setValue("1");
		}
		service.add((Element)options.clone());
		return service;
	}

	private Element getOutNode(Element element)
	{
		Document document = ConfigFileXPath.outXml(element);
		Element service = selectSingleElement(document, "//ns:service");
		if (service != null)
			service.getParent().remove(service);
		return selectSingleElement(document, "//ns:out");
	}

	private Element getOutServiceNode(Element module, Element options)
	{
		Document document = ConfigFileXPath.outXml(module);
		Element service = selectSingleElement(document, "//ns:service");
		service.add((Element)options.clone());
		return service;
	}

	private Element getDcmServiceNode(Element module, Element options)
	{
		Document document = ConfigFileXPath.dcmXml(module);
		Element service = selectSingleElement(document, "//ns:service");
		service.add((Element)options.clone());
		return service;
	}

	private Element getSvcNode(Element element)
	{
		Document document = ConfigFileXPath.svcXml(element);
		Element dbConnPool = selectSingleElement(document, "//ns:dbConnPool");
		Element sessionFactory = selectSingleElement(document, "//ns:sessionFactory");
		if (dbConnPool != null)
			dbConnPool.getParent().remove(dbConnPool);
		if (sessionFactory != null)
			sessionFactory.getParent().remove(sessionFactory);
		return selectSingleElement(document, "//ns:svc");
	}

	private Element getDcmNode(Element element)
	{
		Document document = ConfigFileXPath.dcmXml(element);
		Element service = selectSingleElement(document, "//ns:service");
		if (service != null)
			service.getParent().remove(service);
		return selectSingleElement(document, "//ns:dcm");
	}

	private Element selectSingleElement(Document document, String path)
	{
		return (Element)ConfigFileXPath.createXPath(nameSpaceURI, path).selectSingleNode(document);
	}

	public List getServiceTypeEnumNodes(ModuleType moduleType)
	{
		String typePath = null;
		Element typeEle = null;
		switch (moduleType)
		{
		case LSR: // '\003'
			typePath = "xs:complexType[@name='lsrType']/xs:sequence/xs:element[@name='services']/xs:complexType/xs:sequence/xs:element[@name='service']/xs:complexType/xs:attribute[@name='type']";
			typeEle = (Element)rootElement.selectSingleNode(typePath);
			break;

		case OUT: // '\004'
			typePath = "xs:complexType[@name='outType']/xs:sequence/xs:element[@name='services']/xs:complexType/xs:sequence/xs:element[@name='service']/xs:complexType/xs:attribute[@name='type']";
			typeEle = (Element)rootElement.selectSingleNode(typePath);
			break;

		case DCM: // '\006'
			typePath = "xs:complexType[@name='dcmType']/xs:sequence/xs:element[@name='services']/xs:complexType/xs:sequence/xs:element[@name='service']/xs:complexType/xs:attribute[@name='type']";
			typeEle = (Element)rootElement.selectSingleNode(typePath);
			break;
		}
		if (typeEle == null)
			return null;
		else
			return typeEle.selectNodes("xs:simpleType/xs:restriction/xs:enumeration");
	}

	public JSONArray getServiceTypes(ModuleType moduleType)
	{
		JSONArray typesArr = new JSONArray();
		List types = getServiceTypeEnumNodes(moduleType);
		if (types != null)
		{
			Element type;
			for (Iterator iterator = types.iterator(); iterator.hasNext(); typesArr.add(new SimpleSchemaEnum(type.attributeValue("value"), type.selectSingleNode("xs:annotation/xs:documentation").getText(), type.attributeValue("options"), type.attributeValue("canIsolate"))))
				type = (Element)iterator.next();

		}
		return typesArr;
	}

	public  boolean getDevIsolatedFlag(AfaDeviceType devType, String serviceType[])
	{
		boolean canIsolate = false;
		switch (devType)
		{
		default:
			break;

		case PLATFORM: // '\001'
			String insIsolatePath = "xs:element[@name='platform']/xs:complexType/xs:sequence/xs:element[@name='global']/xs:complexType/xs:sequence/xs:element[@ref='isolation']";
			canIsolate = rootElement.selectSingleNode(insIsolatePath) != null;
			break;

		case WORKGROUP: // '\002'
			String wkgIsolatePath = "xs:element[@name='platform']/xs:complexType/xs:sequence/xs:element[@name='workgroups']/xs:complexType/xs:sequence/xs:element[@name='workgroup']/xs:complexType/xs:sequence/xs:element[@ref='isolation']";
			canIsolate = rootElement.selectSingleNode(wkgIsolatePath) != null;
			break;

		case LSRSERVICE: // '\b'
			List types = getServiceTypeEnumNodes(ModuleType.LSR);
			if (types == null || serviceType == null)
				break;
			for (Iterator iterator = types.iterator(); iterator.hasNext();)
			{
				Element type = (Element)iterator.next();
				if (serviceType[0] != null && (serviceType[0].equals(type.attributeValue("value")) || serviceType[0].equals(type.attributeValue("options"))))
					canIsolate = Boolean.parseBoolean(type.attributeValue("canIsolate"));
			}

			break;
		}
		return canIsolate;
	}


}
