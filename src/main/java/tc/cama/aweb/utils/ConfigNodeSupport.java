package tc.cama.aweb.utils;

import java.io.ByteArrayInputStream;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.exception.AfaConfigException;
import cn.com.agree.aweb.util.ConfigFileXPath;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tc.cama.aweb.bean.AfaDeviceType;
import tc.cama.aweb.bean.BranchJson;
import tc.cama.aweb.bean.ISchemaNode;
import tc.cama.aweb.bean.ItemJson;
import tc.cama.aweb.bean.PageJson;
import tc.cama.aweb.bean.SimpleSchemaAttribute;
import tc.cama.aweb.bean.SimpleSchemaEnum;
import tc.cama.aweb.bean.SimpleSchemaNode;

public abstract class ConfigNodeSupport
{
  protected static final String SEPERATOR = "/";
  protected static final String NODE_ELEMENT = "element";
  protected static final String NODE_ATTRIBUTE = "attribute";
  protected static final String NAME = "name";
  protected static final String VALUE = "value";
  protected static final String TYPE = "type";
  protected static final String CHILD = "child";
  protected static final String NODES = "nodes";
  protected static final String FIELDS = "fields";
  protected static final String ATTRS = "attrs";
  protected static final String NODE_TYPE = "nodeType";
  protected static final String PROPERTY = "property";
  protected static final String USABLE = "usable";
  protected static final String PASSWORD = "Password";
  private Document document;
  private String[] bases;
  private String[] cores;
  private String[] groups;
  
  public ConfigNodeSupport(byte[] configContents)
    throws AfaConfigException
  {
    SAXReader reader = new SAXReader();
    try
    {
      this.document = reader.read(new ByteArrayInputStream(configContents));
      
      initArea();
    }
    catch (DocumentException e)
    {
      throw new AfaConfigException(e);
    }
  }
  
  public ConfigNodeSupport(String configStr, AfaDeviceType deviceType)
    throws AfaConfigException
  {
    try
    {
      this.document = ComponentDOMFactory.createComponentDocument(configStr, deviceType);
      
      initArea();
    }
    catch (DocumentException e)
    {
      throw new AfaConfigException(e);
    }
  }
  
  protected Element getElementByXPath(String xPath)
  {
    return getElementByXPath(xPath, 0);
  }
  
  protected Element getElementByXPath(String xPath, int index)
  {
    XPath path = ConfigFileXPath.createXPath(this.document, xPath);
    List<?> list = path.selectNodes(this.document);
    if ((list == null) || (list.size() == 0)) {
      return null;
    }
    return (Element)list.get(index);
  }
  
  protected void appendElement(String parentXPath, Element append)
    throws AfaConfigException
  {
    Element element = (Element)this.document.selectSingleNode(parentXPath);
    if (element == null) {
      throw new AfaConfigException("parentXPath(" + parentXPath + ")����������");
    }
    element.add((Element)append.clone());
  }
  
  protected byte[] toByteArray()
  {
    return asXML().getBytes();
  }
  
  protected Document getDocument()
  {
    return this.document;
  }
  
  protected String asXML()
  {
    return this.document.asXML();
  }
  
  protected boolean isBaseItem(String name)
  {
    String[] arrayOfString;
    int j = (arrayOfString = this.bases).length;
    for (int i = 0; i < j; i++)
    {
      String str = arrayOfString[i];
      if (str.equals(name)) {
        return true;
      }
    }
    return false;
  }
  
  protected boolean isCoreItem(String name)
  {
    String[] arrayOfString;
    int j = (arrayOfString = this.cores).length;
    for (int i = 0; i < j; i++)
    {
      String str = arrayOfString[i];
      if (str.equals(name)) {
        return true;
      }
    }
    return false;
  }
  
  protected boolean isGroupItem(String name)
  {
    String[] arrayOfString;
    int j = (arrayOfString = this.groups).length;
    for (int i = 0; i < j; i++)
    {
      String str = arrayOfString[i];
      if (str.equals(name)) {
        return true;
      }
    }
    return false;
  }
  
  public void setBases(String[] bases)
  {
    this.bases = bases;
  }
  
  public void setCores(String[] cores)
  {
    this.cores = cores;
  }
  
  public void setGroups(String[] groups)
  {
    this.groups = groups;
  }
  
  protected String uniqueId()
  {
    return UUID.randomUUID().toString();
  }
  
  protected void iteratorElement(Element parent, PageJson pageJson, SchemaManager schema)
  {
    List<Element> elements = parent.elements();
    for (Element element : elements)
    {
      String elementName = element.getName();
      ISchemaNode schemaNode = schema.getSchemaNode(element.getPath());
      if (isBaseItem(elementName))
      {
        ItemJson eleJson = createLeafElementJson(element, schemaNode);
        pageJson.addBaseItem(elementName, eleJson);
      }
      else if (isCoreItem(elementName))
      {
        ItemJson eleJson = createLeafElementJson(element, schemaNode);
        pageJson.addCoreItem(elementName, eleJson);
      }
      else if (isGroupItem(elementName))
      {
        PageJson.GroupJson groupJson = pageJson.group(elementName);
        groupJson.setDesp(schemaNode.getAnnotation());
        groupJson.setxPath(convertPath(element.getPath()));
        groupJson.setUniqueId(uniqueId());
        
        List<Element> childs = element.elements();
        for (Element child : childs)
        {
          ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
          ItemJson childJson = createLeafElementJson(child, childSchemaNode);
          
          groupJson.addItem(childJson);
        }
      }
    }
  }
  
  protected boolean isLeafNode(Element element)
  {
    return element.elements().size() == 0;
  }
  
  protected boolean hasAttributes(Element element)
  {
    return element.attributes().size() > 0;
  }
  
  protected boolean hasAttributes(ISchemaNode schemaNode)
  {
    return (schemaNode.getAttributes() != null) && (schemaNode.getAttributes().size() > 0);
  }
  
  protected ItemJson getItemJson(Element element, SchemaManager schema)
  {
    ISchemaNode childSchemaNode = schema.getSchemaNode(element.getPath());
    
    return createLeafElementJson(element, childSchemaNode);
  }
  
  protected ItemJson createAttrJson(Element element, SimpleSchemaAttribute schemaAttr)
  {
    ItemJson attrJson = new ItemJson();
    Attribute attrbute = element.attribute(schemaAttr.getName());
    if (attrbute == null) {
      return null;
    }
    attrJson.setNodeType("attribute");
    attrJson.setName(schemaAttr.getName());
    attrJson.setxPath(convertPath(attrbute.getPath()));
    attrJson.setValue(attrbute.getText());
    
    attrJson.setCustomizable(schemaAttr.isCustomizable());
    attrJson.setAutoApply(schemaAttr.isAutoApply());
    attrJson.setDesp(schemaAttr.getDesp());
    attrJson.setType(schemaAttr.getType());
    attrJson.setUse(schemaAttr.getUse());
    attrJson.setUniqueId(uniqueId());
    if ((schemaAttr.getEnumeration() != null) && (schemaAttr.getEnumeration().size() > 0)) {
      attrJson.setEnums((SimpleSchemaEnum[])schemaAttr.getEnumeration().toArray(
        new SimpleSchemaEnum[schemaAttr.getEnumeration().size()]));
    } else {
      attrJson.setEnums(new SimpleSchemaEnum[0]);
    }
    return attrJson;
  }
  
  protected ItemJson createLeafElementJson(Element element, ISchemaNode schemaNode)
  {
    ItemJson eleJson = new ItemJson();
    
    eleJson.setNodeType("element");
    
    eleJson.setName(element.getName());
   
    eleJson.setxPath(convertPath(element.getPath()));
    eleJson.setValue(element.getTextTrim());
    
    eleJson.setUniqueId(uniqueId());
    if(schemaNode!=null){
    eleJson.setDef(schemaNode.getDef());
    eleJson.setCustomizable(schemaNode.isCustomizable());
    eleJson.setAutoApply(schemaNode.isAutoApply());
    eleJson.setDesp(schemaNode.getAnnotation());
    eleJson.setType(schemaNode.getType());
    eleJson.setUse(schemaNode.getUse());
    
    eleJson.setMinOccurs(schemaNode.getMinOccurs());
    eleJson.setMaxOccurs(schemaNode.getMaxOccurs());
    eleJson.setMinLength(schemaNode.getMinLength());
    eleJson.setMaxLength(schemaNode.getMaxLength());
    eleJson.setMinExclusive(schemaNode.getMinExclusive());
    eleJson.setMaxInclusive(schemaNode.getMaxInclusive());
    if ((schemaNode.getEnumeration() != null) && (schemaNode.getEnumeration().size() > 0)) {
      eleJson.setEnums((SimpleSchemaEnum[])schemaNode.getEnumeration().toArray(
        new SimpleSchemaEnum[schemaNode.getEnumeration().size()]));
    } else {
      eleJson.setEnums(new SimpleSchemaEnum[0]);
    }
    if (hasAttributes(schemaNode)) {
      for (SimpleSchemaAttribute schemaAttr : schemaNode.getAttributes())
      {
        ItemJson attrJson = createAttrJson(element, schemaAttr);
        if (attrJson != null) {
          eleJson.addAttr(attrJson);
        }
      }
    }
    }
    return eleJson;
  }
  
  protected ItemJson createPropertyElementJson(Element element, ISchemaNode schemaNode, Element parent)
  {
    ItemJson eleJson = new ItemJson();
    
    String name = element.attributeValue("name");
    
    eleJson.setNodeType("element");
    eleJson.setName(name);
    eleJson.setxPath(schemaNode.getXPath());
    
    String value = element.attributeValue("value");
    if ("Password".equalsIgnoreCase(name))
    {
      String encipherVersion = parent.attributeValue("encipherVersion");
      if ("1".equals(encipherVersion)) {
        value = new EncipherAndDecipherUtils().decode3Des(element.attributeValue("value"));
      } else if ("2".equals(encipherVersion)) {
        value = new EncipherAndDecipherUtils().decodeBase64(element.attributeValue("value"));
      } else {
        value = new EncipherAndDecipherUtils().decodeBase64(element.attributeValue("value"));
      }
    }
    eleJson.setValue(value);
    eleJson.setCustomizable(schemaNode.isCustomizable());
    eleJson.setAutoApply(schemaNode.isAutoApply());
    eleJson.setDesp(schemaNode.getAnnotation());
    eleJson.setType(schemaNode.getType());
    eleJson.setUse(schemaNode.getUse());
    eleJson.setUniqueId(uniqueId());
    eleJson.setMinOccurs(schemaNode.getMinOccurs());
    eleJson.setMaxOccurs(schemaNode.getMaxOccurs());
    eleJson.setMinLength(schemaNode.getMinLength());
    eleJson.setMaxLength(schemaNode.getMaxLength());
    eleJson.setMinExclusive(schemaNode.getMinExclusive());
    eleJson.setMaxInclusive(schemaNode.getMaxInclusive());
    
    return eleJson;
  }
  
  protected BranchJson createBranchElementJson(Element element, ISchemaNode schemaNode, SchemaManager schema)
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
    for (Object child1 : element.elements())
    { 
    	Element child= ConvertUtils.convert(child1, Element.class);
      ISchemaNode childSchemaNode = schema.getSchemaNode(child.getPath());
      if (isLeafNode(child))
      {
        if ("property".equals(child.getName()))
        {
          String propertyXPath = convertPropertyPath(child.getPath());
          childSchemaNode = schema.getCustomSchemaNode(propertyXPath + 
            "/" + child.attributeValue("name"));
          if (childSchemaNode == null) {
            childSchemaNode = schema.getCustomSchemaNode(propertyXPath + 
              element.attributeValue("type") + "/" + child.attributeValue("name"));
          }
          if (childSchemaNode == null)
          {
            childSchemaNode = schema.getCustomSchemaNode(propertyXPath);
            if (childSchemaNode != null) {
              adaptSchemaNode(child, (SimpleSchemaNode)childSchemaNode);
            }
          }
          eleJson.addNodes(createPropertyElementJson(child, childSchemaNode, element));
        }
        else
        {
          eleJson.addNodes(createLeafElementJson(child, childSchemaNode));
        }
      }
      else {
        eleJson.addChild(createBranchElementJson(child, childSchemaNode, schema));
      }
    }
    if (hasAttributes(schemaNode)) {
      for (SimpleSchemaAttribute schemaAttr : schemaNode.getAttributes())
      {
        ItemJson attrJson = createAttrJson(element, schemaAttr);
        if (attrJson != null) {
          eleJson.addAttr(attrJson);
        }
      }
    }
    return eleJson;
  }
  
  private void adaptSchemaNode(Element propertyEle, SimpleSchemaNode schemaNode)
  {
    String value = propertyEle.attributeValue("value");
    schemaNode.setAnnotation("");
    schemaNode.setType("xs:string");
    Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
    if (pattern.matcher(value).matches()) {
      schemaNode.setType("xs:integer");
    }
    if (("false".equalsIgnoreCase(value)) || ("true".equalsIgnoreCase(value))) {
      schemaNode.setType("xs:boolean");
    }
  }
  
  protected void createChildElement(Element parentEle, String label, JSONObject jsonObject)
  {
    if ("element".equals(jsonObject.getString("nodeType")))
    {
      Element element = parentEle.addElement(label);
      if (jsonObject.containsKey("value"))
      {
        element.setText(jsonObject.getString("value"));
      }
      else
      {
        JSONArray attrItems = jsonObject.getJSONArray("attrs");
        int i = 0;
        for (int size = attrItems.size(); i < size; i++)
        {
          JSONObject attrItemJson = attrItems.getJSONObject(i);
          element.addAttribute(attrItemJson.getString("name"), attrItemJson.getString("value"));
        }
        JSONArray nodeItems = jsonObject.getJSONArray("nodes");
        int k = 0;
        for (int size = nodeItems.size(); k < size; k++)
        {
          JSONObject nodeItemJson = nodeItems.getJSONObject(k);
          
          Element childEle = element.addElement(nodeItemJson.getString("name"));
          if (nodeItemJson.containsKey("value"))
          {
            childEle.setText(nodeItemJson.getString("value"));
          }
          else
          {
            childEle.addAttribute("mc", nodeItemJson.getString("mc"));
            childEle.addAttribute("tc", nodeItemJson.getString("tc"));
          }
        }
        JSONArray childItems = jsonObject.getJSONArray("child");
        int j = 0;
        for (int size = childItems.size(); j < size; j++)
        {
          JSONObject childItemJson = childItems.getJSONObject(i);
          createChildElement(element, childItemJson.getString("name"), childItemJson);
        }
      }
    }
    else
    {
      parentEle.addAttribute(label, jsonObject.getString("value"));
    }
  }
  
  protected BranchJson createCustomBranchJson(ISchemaNode schemaNode, SchemaManager schema, String parentXPath)
  {
    BranchJson eleJson = new BranchJson();
    String xPath = parentXPath + schemaNode.getXPath();
    
    eleJson.setName(schemaNode.getName());
    eleJson.setxPath(xPath);
    eleJson.setNodeType("element");
    
    eleJson.setCustomizable(schemaNode.isCustomizable());
    eleJson.setAutoApply(schemaNode.isAutoApply());
    eleJson.setDesp(schemaNode.getAnnotation());
    eleJson.setUse(schemaNode.getUse());
    eleJson.setUniqueId(uniqueId());
    eleJson.setMinOccurs(schemaNode.getMinOccurs());
    eleJson.setMaxOccurs(schemaNode.getMaxOccurs());
    ItemJson attrJson;
    if ((schemaNode.getAttributes() != null) && (schemaNode.getAttributes().size() > 0)) {
      for (SimpleSchemaAttribute schemaAttr : schemaNode.getAttributes())
      {
        attrJson = createCustomAttrJson(schemaAttr, xPath);
        eleJson.addAttr(attrJson);
      }
    }
    List<String> xPathOfChilds = schemaNode.getxPathOfChild();
    if ((xPathOfChilds != null) && (xPathOfChilds.size() > 0)) {
      for (String xPathOfChild : xPathOfChilds)
      {
        ISchemaNode childNode = schema.getCustomSchemaNode(xPathOfChild);
        if ((childNode.getxPathOfChild() != null) && (childNode.getxPathOfChild().size() > 0)) {
          eleJson.addChild(createCustomBranchJson(childNode, schema, parentXPath));
        } else {
          eleJson.addNodes(createCustomItemJson(childNode, parentXPath));
        }
      }
    }
    return eleJson;
  }
  
  protected ItemJson createCustomItemJson(ISchemaNode schemaNode, String parentXPath)
  {
    ItemJson eleJson = new ItemJson();
    String xPath = parentXPath + schemaNode.getXPath();
    
    eleJson.setNodeType("element");
    eleJson.setName(schemaNode.getName());
    eleJson.setxPath(xPath);
    eleJson.setDef(schemaNode.getDef());
    
    eleJson.setCustomizable(schemaNode.isCustomizable());
    eleJson.setAutoApply(schemaNode.isAutoApply());
    eleJson.setDesp(schemaNode.getAnnotation());
    eleJson.setType(schemaNode.getType());
    eleJson.setUse(schemaNode.getUse());
    eleJson.setUniqueId(uniqueId());
    eleJson.setMinOccurs(schemaNode.getMinOccurs());
    eleJson.setMaxOccurs(schemaNode.getMaxOccurs());
    eleJson.setMinLength(schemaNode.getMinLength());
    eleJson.setMaxLength(schemaNode.getMaxLength());
    eleJson.setMinExclusive(schemaNode.getMinExclusive());
    eleJson.setMaxInclusive(schemaNode.getMaxInclusive());
    if ((schemaNode.getAttributes() != null) && (schemaNode.getAttributes().size() > 0)) {
      for (SimpleSchemaAttribute schemaAttr : schemaNode.getAttributes())
      {
        ItemJson attrJson = createCustomAttrJson(schemaAttr, xPath);
        eleJson.addAttr(attrJson);
      }
    }
    return eleJson;
  }
  
  protected ItemJson createCustomAttrJson(SimpleSchemaAttribute schemaAttr, String parentXPath)
  {
    ItemJson attrJson = new ItemJson();
    parentXPath = parentXPath == null ? "" : parentXPath;
    
    attrJson.setNodeType("attribute");
    attrJson.setName(schemaAttr.getName());
    attrJson.setxPath(parentXPath + "@" + schemaAttr.getName());
    attrJson.setDef(schemaAttr.getDef());
    
    attrJson.setCustomizable(schemaAttr.isCustomizable());
    attrJson.setAutoApply(schemaAttr.isAutoApply());
    attrJson.setDesp(schemaAttr.getDesp());
    attrJson.setType(schemaAttr.getType());
    attrJson.setUse(schemaAttr.getUse());
    attrJson.setUniqueId(uniqueId());
    if ((schemaAttr.getEnumeration() != null) && (schemaAttr.getEnumeration().size() > 0)) {
      attrJson.setEnums((SimpleSchemaEnum[])schemaAttr.getEnumeration().toArray(
        new SimpleSchemaEnum[schemaAttr.getEnumeration().size()]));
    } else {
      attrJson.setEnums(new SimpleSchemaEnum[0]);
    }
    return attrJson;
  }
  
  public Document createDocumentFromPageJson(String rootName, JSONObject pageJson)
  {
    String BASE = "base";
    String CORE = "core";
    String GROUPS = "groups";
    
    Document document = DocumentHelper.createDocument();
    Element root = createRootElement(document, rootName);
    
    JSONObject baseJson = pageJson.getJSONObject("base");
    Iterator<?> baseIterator = baseJson.keySet().iterator();
    while (baseIterator.hasNext())
    {
      String label = (String)baseIterator.next();
      JSONObject itemJson = baseJson.getJSONObject(label);
      if ("element".equals(itemJson.getString("nodeType")))
      {
        Element element = root.addElement(label);
        element.setText(itemJson.getString("value"));
      }
      else
      {
        root.addAttribute(label, itemJson.getString("value"));
      }
    }
    JSONObject coreJson = pageJson.getJSONObject("core");
    Iterator<?> coreIterator = coreJson.keySet().iterator();
    while (coreIterator.hasNext())
    {
      String label = (String)coreIterator.next();
      JSONObject itemJson = coreJson.getJSONObject(label);
      if ("element".equals(itemJson.getString("nodeType")))
      {
        Element element = root.addElement(label);
        element.setText(itemJson.getString("value"));
      }
      else
      {
        root.addAttribute(label, itemJson.getString("value"));
      }
    }
    JSONObject groupsJson = pageJson.getJSONObject("groups");
    Iterator<?> groupsIterator = groupsJson.keySet().iterator();
    int i=0;
    int size=groupsJson.keySet().hashCode();
    for (; groupsIterator.hasNext()&i < size;)
    {
      String groupName = (String)groupsIterator.next();
      Element groupElement = root.addElement(groupName);
      
      JSONArray groupItems = groupsJson.getJSONObject(groupName).getJSONArray("fields");
      i = 0;size = groupItems.size(); 
      if(1==2){
      continue;
      }
      JSONObject itemJson = groupItems.getJSONObject(i);
      
      Element element = groupElement.addElement(itemJson.getString("name"));
      element.setText(itemJson.getString("value"));
      i++;
    }
    return document;
  }
  
  protected Element createRootElement(Document document, String rootName)
  {
    return document.addElement(rootName, this.document.getRootElement().getNamespaceURI());
  }
  
  protected void setBaseAttribute(Element element, PageJson pageJson, SchemaManager schema)
  {
    ISchemaNode schemaNode = schema.getSchemaNode(element.getPath());
    if (hasAttributes(schemaNode)) {
      for (SimpleSchemaAttribute schemaAttr : schemaNode.getAttributes())
      {
        ItemJson attrJson = createAttrJson(element, schemaAttr);
        if (attrJson != null) {
          pageJson.addBaseItem(schemaAttr.getName(), attrJson);
        }
      }
    }
  }
  
  protected abstract void initArea();
  
  public abstract Element getElement()
    throws AfaConfigException;
  
  public abstract PageJson getPageJson(SchemaManager paramSchemaManager)
    throws AfaConfigException;
  
  protected String convertPropertyPath(String xPath)
  {
    String tempPath = convertPath(xPath);
    if (tempPath != null)
    {
      if (tempPath.contains("/svc")) {
        return tempPath.substring(tempPath.indexOf("/svc") + 4);
      }
      if (tempPath.contains("ehcacheOptions")) {
        return tempPath.substring(tempPath.indexOf("/ehcacheOptions") + 15);
      }
    }
    return tempPath;
  }
  
  protected String convertPath(String xPath)
  {
    String tempPath = null;
    Pattern p = Pattern.compile("\\/\\*\\[name\\(\\)='([^\\']+)'\\]");
    Matcher m = p.matcher(xPath);
    while (m.find())
    {
      if (tempPath == null) {
        tempPath = "";
      }
      tempPath = tempPath + "/" + m.group(1);
    }
    return tempPath != null ? tempPath : xPath;
  }
}
