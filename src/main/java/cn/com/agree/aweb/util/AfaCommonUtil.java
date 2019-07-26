package cn.com.agree.aweb.util;


import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import cn.com.agree.afa.core.scoreboard.DeviceState;
import cn.com.agree.afa.core.scoreboard.score.GroupScore;
import cn.com.agree.afa.gateway.omi.IRcOperator;
import cn.com.agree.afa.gateway.omi.RcOmiException;
import cn.com.agree.afa.omi.IOperationsManager;
import cn.com.agree.afa.omi.OmiException;
import cn.com.agree.afa.util.URL;
import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.exception.AfaConfigException;
import tc.cama.aweb.bean.ServiceInfo;
import tc.cama.aweb.model.AfaWorkgroupVO;
import tc.cama.aweb.utils.AFAContainer;
import tc.cama.aweb.utils.ConfigManager;
import tc.cama.aweb.utils.SchemaManager;

public class AfaCommonUtil
{
  public static List<ServiceInfo> getAllServiceInfos(IRcOperator registry)
    throws RcOmiException
  {
    List<ServiceInfo> serviceInfos = new ArrayList();
    List<URL> urls = registry.getRpcServiceInfos();
    for (URL url : urls)
    {
      ServiceInfo serviceInfo = new ServiceInfo();
      serviceInfo.setAddress(url.getAddress());
      serviceInfo.setAdminPort(url.getParameter("adminPort", 0));
      serviceInfo.setGid(url.getParameter("gid", 0));
      serviceInfo.setMid(url.getParameter("mid", 0));
      serviceInfo.setSid(url.getParameter("sid", 0));
      serviceInfo.setName(url.getParameter("name"));
      serviceInfo.setRpcIdentify(url.getParameter("rpcIdentify"));
      
      serviceInfos.add(serviceInfo);
    }
    return serviceInfos;
  }
  
  public static List<ServiceInfo> getAvailableServiceInfos(IRcOperator registry)
    throws RcOmiException, OmiException
  {
    List<ServiceInfo> serviceInfos = new ArrayList();
    List<URL> urls = registry.getRpcServiceInfos();
    for (URL url : urls)
    {
      ServiceInfo serviceInfo = new ServiceInfo();
      serviceInfo.setAddress(url.getAddress());
      serviceInfo.setAdminPort(url.getParameter("adminPort", 0));
      serviceInfo.setGid(url.getParameter("gid", 0));
      serviceInfo.setMid(url.getParameter("mid", 0));
      serviceInfo.setSid(url.getParameter("sid", 0));
      serviceInfo.setName(url.getParameter("name"));
      serviceInfo.setRpcIdentify(url.getParameter("rpcIdentify"));
      if (fetchAvailableRpcService(serviceInfo) != null) {
        serviceInfos.add(serviceInfo);
      }
    }
    return serviceInfos;
  }
  
  public static List<URL> getAvailableRegistriedInfos(IRcOperator registry)
    throws RcOmiException, OmiException
  {
    List<ServiceInfo> serviceInfos = getAvailableServiceInfos(registry);
    List<String> avlbAddrs = new ArrayList();
    for (ServiceInfo serviceInfo : serviceInfos) {
      avlbAddrs.add(serviceInfo.getAddress());
    }
    List<URL> tempList = new ArrayList();
    Object infoList = registry.getRegisteriedInfos();
    List<URL> tempList1= ConvertUtils.convert(infoList, List.class);
    for (URL url :tempList1 ) {
      if (avlbAddrs.contains(url.getHost() + ":" + url.getPort())) {
        tempList.add(url);
      }
    }
    return tempList;
  }
  
  public static ServiceInfo pickServiceInfo(IRcOperator registry, String rpcAddress)
    throws RcOmiException, OmiException
  {
    List<ServiceInfo> serviceList = getAvailableServiceInfos(registry);
    registry.getRpcServiceInfos();
    for (int i = 0; i < serviceList.size(); i++)
    {
      ServiceInfo serviceInfo = (ServiceInfo)serviceList.get(i);
      if (serviceInfo.getAddress().equals(rpcAddress)) {
        return serviceInfo;
      }
    }
    return null;
  }
  
  public static ServiceInfo fetchAvailableRpcService(ServiceInfo serviceInfo) throws OmiException
  {
    String host = serviceInfo.getAddress().split(":")[0];
    int port = serviceInfo.getAdminPort();
    if (AFAContainer.getExistManager(host, port) != null) {
      return serviceInfo;
    }
    return null;
  }
  
  public static List<GroupScore> getGroupScores(IOperationsManager manager)
    throws UnsupportedEncodingException, DocumentException, OmiException
  {
    List<GroupScore> groupScores = new ArrayList();
    ConfigManager configManager = ConfigManager.createConfigManager(manager);
    List<Element> workgroupEles = configManager.selectSingleNode(ConfigFileXPath.workgroups()).elements();
    for (Element workgroupEle : workgroupEles)
    {
      int gid = Integer.parseInt(workgroupEle.attributeValue("id"));
      groupScores.add(manager.getGroupScore(gid));
    }
    return groupScores;
  }
  
  public static List<AfaWorkgroupVO> getWorkgroupVOFromXml(String managerKey)
    throws UnsupportedEncodingException, DocumentException, OmiException
  {
    IOperationsManager manager = AFAContainer.getExistManager(managerKey);
    if ((manager == null) || (AFAContainer.getManagerState(manager).equals(DeviceState.Stopped))) {
      return null;
    }
    List<AfaWorkgroupVO> wkgVOList = new ArrayList();
    ConfigManager configManager = ConfigManager.createConfigManager(manager);
    List<Element> workgroupEles = configManager.selectSingleNode(ConfigFileXPath.workgroups()).elements();
    for (Element workgroupEle : workgroupEles)
    {
      int gid = Integer.parseInt(workgroupEle.attributeValue("id"));
      String name = workgroupEle.attributeValue("name");
      AfaWorkgroupVO wkgVO = new AfaWorkgroupVO(managerKey, gid, name);
      wkgVOList.add(wkgVO);
    }
    return wkgVOList;
  }
  
  public static String getSchemaVersion(IOperationsManager manager)
    throws DocumentException, OmiException
  {
    return getSchemaVersion(ConfigManager.getSchemaContents(manager));
  }
  
  public static String getSchemaVersion(byte[] schemaContents)
    throws DocumentException
  {
    SAXReader reader = new SAXReader();
    Document document = reader.read(new ByteArrayInputStream(schemaContents));
    return getSchemaVersion(document);
  }
  
  public static String getSchemaVersion(Document document)
  {
    Element schemaEle = (Element)document.getRootElement().selectSingleNode("//xs:schema");
    return schemaEle.attributeValue("version") != null ? schemaEle.attributeValue("version") : "";
  }
  
  public static SchemaManager getSchemaManager(IOperationsManager manager)
    throws OmiException, DocumentException, AfaConfigException
  {
    byte[] schemaContents = ConfigManager.getSchemaContents(manager);
    String schemaVersion = getSchemaVersion(schemaContents);
    SchemaManager sm= SchemaManager.createSchemaManager(schemaContents);
    SchemaManager schema = SchemaManager.getSchemaManager(schemaVersion);
    schema = schema == null ? SchemaManager.createSchemaManager(schemaContents) : schema;
    
    return schema;
  }
  
  public static Element getTargetElement(Element srcEle, String namespace)
  {
    Element targetEle = DocumentHelper.createElement(srcEle.getName());
    targetEle.addNamespace("", namespace);
    
    copyElement(targetEle, srcEle, namespace);
    
    return targetEle;
  }
  
  public static String convertPath(String xPath)
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
  
  private static void copyElement(Element destEle, Element srcEle, String namespace)
  {
    List<Attribute> attributes = srcEle.attributes();
    if (attributes.size() > 0) {
      for (Attribute a : attributes) {
        destEle.addAttribute(a.getName(), a.getValue());
      }
    }
    List<Element> elements = srcEle.elements();
    if (elements.size() > 0) {
      for (Element e : elements)
      {
        Element childEle = destEle.addElement(e.getName(), namespace);
        childEle.setText(e.getText());
        copyElement(childEle, e, namespace);
      }
    }
  }
  
  public static void adjustTagPosition(String serviceType, Element serviceEle)
  {
    String optionsXpath = ".//ns:" + serviceType;
    String defaultMCXpath = ".//ns:defaultMC";
    
    Element optionsEle = DcmCacheConfigUtil.selectSingleNode(serviceEle, optionsXpath);
    Element defaultMCEle = DcmCacheConfigUtil.selectSingleNode(serviceEle, defaultMCXpath);
    
    Element parentEle = optionsEle.getParent();
    int defaultMCEleIndex = parentEle.indexOf(defaultMCEle);
    parentEle.remove(optionsEle);
    parentEle.content().add(defaultMCEleIndex, optionsEle);
  }
}
