// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   SchemaBundle.java

package tc.cama.aweb.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Element;

import cn.com.agree.aweb.util.AfaCommonUtil;
import tc.cama.aweb.bean.ISchemaNode;
import tc.cama.aweb.bean.SimpleSchemaAttribute;
import tc.cama.aweb.bean.SimpleSchemaEnum;
import tc.cama.aweb.bean.SimpleSchemaNode;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xsd:
//			SchemaLabels, ISchemaNode, SimpleSchemaNode, SimpleSchemaEnum, 
//			SimpleSchemaAttribute

public class SchemaBundle
	implements SchemaLabels
{

	private HashMap platMap;
	private HashMap refMap;
	private HashMap typeMap;
	private HashMap customAppInfo;
	static final String SEPERATOR = "/";
	static final String STRING_TRUE = "true";
	static final String STRING_FALSE = "false";

	public SchemaBundle(Element root)
	{
		platMap = new HashMap();
		refMap = new HashMap();
		typeMap = new HashMap();
		customAppInfo = new HashMap();
		doInit(root);
	}

	private void doInit(Element root)
	{
		parseRef(root.selectNodes("xs:element[@name!='platform']"));
		parseType(root.selectNodes("xs:complexType"));
		parsePlat((Element)root.selectSingleNode("xs:element[@name='platform']"));
		parseCustomInfo(root);
	}

	private void parseType(List types)
	{
		if (types == null || types.size() == 0)
			return;
		Element type;
		ISchemaNode typeNode;
		for (Iterator iterator = types.iterator(); iterator.hasNext(); iteratorElement(type, typeNode, typeMap))
		{
			type = (Element)iterator.next();
			typeNode = createSimpleSchemaNode(type, null, Boolean.valueOf(type.attributeValue("customizable")).booleanValue(), Boolean.valueOf(isAutoApply(type, true)).booleanValue());
			typeMap.put(typeNode.getXPath(), typeNode);
		}

	}

	private void parseRef(List refs)
	{
		if (refs == null || refs.size() == 0)
			return;
		Element ref;
		ISchemaNode refNode;
		for (Iterator iterator = refs.iterator(); iterator.hasNext(); iteratorElement(ref, refNode, refMap))
		{
			ref = (Element)iterator.next();
			refNode = createSimpleSchemaNode(ref, null, Boolean.valueOf(ref.attributeValue("customizable")).booleanValue(), Boolean.valueOf(isAutoApply(ref, true)).booleanValue());
			refMap.put(refNode.getXPath(), refNode);
		}

	}

	private void parsePlat(Element platElement)
	{
		ISchemaNode platNode = createSimpleSchemaNode(platElement, null, Boolean.valueOf(platElement.attributeValue("customizable")).booleanValue(), Boolean.valueOf(isAutoApply(platElement, true)).booleanValue());
		platMap.put(platNode.getXPath(), platNode);
		iteratorElement(platElement, platNode, platMap);
	}

	private void parseCustomInfo(Element root)
	{
		for (Iterator iterator = CUSTOM_XPATH_LIST.iterator(); iterator.hasNext();)
		{
			String xPath = (String)iterator.next();
			Element parentEle = (Element)root.selectSingleNode(xPath);
			if (parentEle != null)
			{
				SimpleSchemaNode parentNode = createCustomSchemaNode(parentEle, null, Boolean.valueOf(parentEle.attributeValue("customizable")).booleanValue(), Boolean.valueOf(isAutoApply(parentEle, true)).booleanValue(), false);
				iteratorCustomElement(parentEle, customAppInfo, parentNode, root);
			}
		}

	}

	private void iteratorCustomElement(Element element, HashMap map, SimpleSchemaNode parentNode, Element root)
	{
		boolean appInfo = false;
		List xPaths = new ArrayList();
		List elements = element.selectNodes("xs:complexType/xs:sequence/xs:element");
		if (elements == null || elements.size() == 0)
		{
			elements = element.selectNodes("xs:annotation/xs:appinfo/xs:element");
			appInfo = true;
		}
		if ((elements == null || elements.size() == 0) && ("property".equals(element.attributeValue("name")) || "property".equals(element.attributeValue("ref"))))
		{
			List lists = element.selectNodes("ancestor::xs:element[@name='dbConnPool']");
			if (lists != null && lists.size() > 0)
			{
				List tempElements = ((Element)lists.get(0)).selectNodes("xs:complexType/xs:attribute/xs:simpleType/xs:restriction/xs:enumeration");
				Element e;
				SimpleSchemaNode tempNode;
				for (Iterator iterator1 = tempElements.iterator(); iterator1.hasNext(); iteratorCustomElement(e, map, tempNode, root))
				{
					e = (Element)iterator1.next();
					tempNode = parentNode.clone();
					tempNode.setxPath((new StringBuilder(String.valueOf(tempNode.getXPath()))).append(e.attributeValue("value")).toString());
				}

			}
		}
		if (elements != null && elements.size() > 0)
		{
			SimpleSchemaNode customNode;
			for (Iterator iterator = elements.iterator(); iterator.hasNext(); xPaths.add(customNode.getXPath()))
			{
				Element e = (Element)iterator.next();
				customNode = createCustomSchemaNode(e, parentNode.getXPath(), parentNode.isCustomizable(), parentNode.isAutoApply(), appInfo);
				map.put(customNode.getXPath(), customNode);
				iteratorCustomElement(e, map, customNode, root);
			}

			parentNode.setxPathOfChild(xPaths);
			map.put(parentNode.getXPath(), parentNode);
		}
		Element refEle = getCustomRefElement(root, parentNode);
		if (refEle != null)
		{
			SimpleSchemaNode refNode = createCustomSchemaNode(refEle, null, Boolean.valueOf(refEle.attributeValue("customizable")).booleanValue(), Boolean.valueOf(isAutoApply(refEle, true)).booleanValue(), false);
			iteratorCustomElement(refEle, customAppInfo, refNode, root);
		}
	}

	private Element getCustomRefElement(Element root, SimpleSchemaNode parentNode)
	{
		if (parentNode == null)
			return null;
		if (parentNode.getRef() != null)
			return (Element)root.selectSingleNode((new StringBuilder("//xs:element[@name='")).append(parentNode.getRef()).append("']").toString());
		if (parentNode.getType() != null && TYPE_LIST.contains(parentNode.getType()))
			return (Element)root.selectSingleNode((new StringBuilder("//xs:element[@name='")).append(parentNode.getRef()).append("']").toString());
		else
			return null;
	}

	private void iteratorElement(Element element, ISchemaNode parentNode, HashMap map)
	{
		List elements = element.selectNodes("xs:complexType/xs:sequence/xs:element");
		if (elements == null || elements.size() == 0)
			elements = element.selectNodes("xs:sequence/xs:element");
		if (elements != null && elements.size() > 0)
		{
			for (Iterator iterator = elements.iterator(); iterator.hasNext();)
			{
				Element e = (Element)iterator.next();
				if (e.attributeValue("type") == null || !TYPE_LIST.contains(e.attributeValue("type")))
				{
					ISchemaNode node = createSimpleSchemaNode(e, parentNode.getXPath(), parentNode.isCustomizable(), parentNode.isAutoApply());
					if (node != null)
					{
						map.put(node.getXPath(), node);
						iteratorElement(e, node, map);
					}
				}
			}

		}
	}

	private ISchemaNode createSimpleSchemaNode(Element element, String parentXPath, boolean customizable, boolean autoApply)
	{
		ISchemaNode tempNode = null;
		if (element.attributeValue("ref") != null && element.attributeValue("ref").length() > 0)
			tempNode = (ISchemaNode)refMap.get((new StringBuilder("/")).append(element.attributeValue("ref")).toString());
		SimpleSchemaNode node = new SimpleSchemaNode();
		String name = element.attributeValue("name");
		String xPath = name != null ? (new StringBuilder("/")).append(name).toString() : (new StringBuilder("/")).append(element.attributeValue("ref")).toString();
		xPath = parentXPath != null ? (new StringBuilder(String.valueOf(parentXPath))).append(xPath).toString() : xPath;
		node.setxPath(xPath);
		node.setName(name);
		node.setMinOcccurs(element.attributeValue("minOccurs"));
		node.setMaxOccurs(element.attributeValue("maxOccurs"));
		node.setRef(element.attributeValue("ref"));
		node.setType(getElementType(element, tempNode));
		node.setDef(element.attributeValue("default"));
		node.setCustomizable(customizable ? String.valueOf(customizable) : element.attributeValue("customizable"));
		node.setAutoApply(isAutoApply(element, autoApply));
		node.setUse(element.attributeValue("use"));
		node.setMinLength(getMinLength(element));
		node.setMaxLength(getMaxLength(element));
		node.setMaxInclusive(getMaxInclusive(element));
		node.setMinExclusive(getMinExclusive(element));
		node.setAnnotation(getAnnotation(element, tempNode));
		node.setAttributes(getAttributes(element, node.isCustomizable(), node.isAutoApply()));
		node.setEnumeration(getEnumeration(element));
		return node;
	}

	private SimpleSchemaNode createCustomSchemaNode(Element element, String parentXPath, boolean customizable, boolean autoApply, boolean appInfo)
	{
		SimpleSchemaNode node = new SimpleSchemaNode();
		String name = element.attributeValue("name") == null ? element.attributeValue("ref") : element.attributeValue("name");
		String xPath = name != null ? (new StringBuilder("/")).append(name).toString() : (new StringBuilder("/")).append(element.attributeValue("ref")).toString();
		xPath = parentXPath != null ? (new StringBuilder(String.valueOf(parentXPath))).append(xPath).toString() : xPath;
		node.setxPath(xPath);
		node.setName(name);
		node.setMinOcccurs(element.attributeValue("minOccurs"));
		node.setMaxOccurs(element.attributeValue("maxOccurs"));
		node.setRef(element.attributeValue("ref"));
		node.setType(getElementType(element, null));
		node.setDef(element.attributeValue("default"));
		node.setCustomizable(customizable ? String.valueOf(customizable) : element.attributeValue("customizable"));
		node.setAutoApply(isAutoApply(element, autoApply));
		node.setUse(element.attributeValue("use"));
		node.setMinLength(getMinLength(element));
		node.setMaxLength(getMaxLength(element));
		node.setMaxInclusive(getMaxInclusive(element));
		node.setMinExclusive(getMinExclusive(element));
		node.setAnnotation(appInfo ? element.attributeValue("desc").trim() : getAnnotation(element, null));
		node.setAttributes(getAttributes(element, node.isCustomizable(), node.isAutoApply()));
		node.setEnumeration(getEnumeration(element));
		return node;
	}

	private List getEnumeration(Element element)
	{
		List enums = null;
		List list = element.selectNodes("xs:simpleType/xs:restriction/xs:enumeration");
		if (list != null && list.size() > 0)
		{
			enums = new ArrayList();
			Element enumEle;
			for (Iterator iterator = list.iterator(); iterator.hasNext(); enums.add(new SimpleSchemaEnum(enumEle.attributeValue("value"), enumEle.selectSingleNode("xs:annotation/xs:documentation").getText().trim())))
				enumEle = (Element)iterator.next();

			return enums;
		} else
		{
			return null;
		}
	}

	private String getMinLength(Element element)
	{
		if (element != null)
		{
			Element minLengthEle = (Element)element.selectSingleNode("xs:simpleType/xs:restriction/xs:minLength");
			return minLengthEle == null ? null : minLengthEle.attributeValue("value");
		} else
		{
			return null;
		}
	}

	private String getMaxLength(Element element)
	{
		if (element != null)
		{
			Element maxLengthEle = (Element)element.selectSingleNode("xs:simpleType/xs:restriction/xs:maxLength");
			return maxLengthEle == null ? null : maxLengthEle.attributeValue("value");
		} else
		{
			return null;
		}
	}

	private String getMinExclusive(Element element)
	{
		if (element != null)
		{
			Element minExclusiveEle = (Element)element.selectSingleNode("xs:simpleType/xs:restriction/xs:minExclusive");
			return minExclusiveEle == null ? null : minExclusiveEle.attributeValue("value");
		} else
		{
			return null;
		}
	}

	private String getMaxInclusive(Element element)
	{
		if (element != null)
		{
			Element maxInclusiveEle = (Element)element.selectSingleNode("xs:simpleType/xs:restriction/xs:maxInclusive");
			return maxInclusiveEle == null ? null : maxInclusiveEle.attributeValue("value");
		} else
		{
			return null;
		}
	}

	private List getAttributes(Element element, boolean customizable, boolean autoApply)
	{
		List attrList = null;
		List list = element.selectNodes("xs:complexType/xs:attribute");
		if (list == null || list.size() == 0)
			list = element.selectNodes("xs:attribute");
		if (list != null && list.size() > 0)
		{
			attrList = new ArrayList();
			SimpleSchemaAttribute attr;
			for (Iterator iterator = list.iterator(); iterator.hasNext(); attrList.add(attr))
			{
				Element attrEle = (Element)iterator.next();
				attr = new SimpleSchemaAttribute();
				String annotation = attrEle.selectSingleNode("xs:annotation/xs:documentation") != null ? attrEle.selectSingleNode("xs:annotation/xs:documentation").getText().trim() : "";
				attr.setName(attrEle.attributeValue("name"));
				attr.setType(attrEle.attributeValue("type"));
				attr.setUse(attrEle.attributeValue("use"));
				attr.setDef(attrEle.attributeValue("default"));
				attr.setDesp(annotation);
				attr.setCustomizable(customizable ? String.valueOf(customizable) : attrEle.attributeValue("customizable"));
				attr.setAutoApply(isAutoApply(attrEle, autoApply));
				attr.setCustomizable(attrEle.attributeValue("customizable"));
				attr.setEnumeration(getEnumeration(attrEle));
			}

			return attrList;
		} else
		{
			return null;
		}
	}

	private String getElementType(Element element, ISchemaNode tempNode)
	{
		if (tempNode != null && tempNode.getType().length() > 0)
			return tempNode.getType();
		if (element.attributeValue("type") != null)
		{
			return element.attributeValue("type");
		} else
		{
			Element restrEle = (Element)element.selectSingleNode("xs:simpleType/xs:restriction");
			return restrEle == null ? "" : restrEle.attributeValue("base");
		}
	}

	private String getAnnotation(Element element, ISchemaNode tempNode)
	{
		if (tempNode != null && tempNode.getAnnotation().length() > 0)
		{
			return tempNode.getAnnotation();
		} else
		{
			Element annotationElement = (Element)element.selectSingleNode("xs:annotation/xs:documentation");
			return annotationElement != null ? annotationElement.getText().trim() : "";
		}
	}

	private String isAutoApply(Element element, boolean autoApply)
	{
		if (autoApply)
			return "false".equals(element.attributeValue("autoApply")) ? "false" : "true";
		else
			return "false";
	}

	public ISchemaNode get(String xPath)
	{
		if (xPath == null)
			return null;
		xPath = AfaCommonUtil.convertPath(xPath);
		ISchemaNode node = (ISchemaNode)platMap.get(xPath);
		if (node == null && xPath != null)
		{
			String parts[] = xPath.substring(1).split("/");
			if (parts.length < 1)
				return node;
			for (int i = parts.length - 1; i >= 0; i--)
			{
				String tempPath = "";
				for (int j = i; j < parts.length; j++)
					tempPath = (new StringBuilder(String.valueOf(tempPath))).append("/").append(parts[j]).toString();

				node = (ISchemaNode)typeMap.get(convertTypePath(tempPath));
				if (node != null)
					return node;
			}

			for (int i = parts.length - 1; i >= 0; i--)
			{
				String tempPath = "";
				for (int j = i; j < parts.length; j++)
					tempPath = (new StringBuilder(String.valueOf(tempPath))).append("/").append(parts[j]).toString();

				if (!Arrays.asList(parts).contains("task") || !Arrays.asList(parts).contains("description") || !"/description".equals(tempPath))
				{
					node = (ISchemaNode)refMap.get(tempPath);
					if (node != null)
						return node;
				}
			}

		}
		return node;
	}

	public ISchemaNode getCustomInfo(String xPath)
	{
		if (xPath == null)
			return null;
		else
			return (ISchemaNode)customAppInfo.get(xPath);
	}

	private Object convertTypePath(String tempPath)
	{
		if (tempPath.startsWith("/lsr"))
			return tempPath.replace("/lsr", "/lsrType");
		if (tempPath.startsWith("/out"))
			return tempPath.replace("/out", "/outType");
		if (tempPath.startsWith("/svc"))
			return tempPath.replace("/svc", "/svcType");
		if (tempPath.startsWith("/dcm"))
			return tempPath.replace("/dcm", "/dcmType");
		if (tempPath.startsWith("/applog"))
			return tempPath.replace("/applog", "/applogType");
		else
			return "";
	}
}
