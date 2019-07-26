package cn.com.agree.aweb.util;


import java.util.HashMap;
import java.util.Map;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.XPath;

public enum ConfigFileXPath
{
  PLATFORM("platform"),  VERSION("version"),  GLOBAL("global"),  MONITOR("monitor"),  WORKGROUPS("workgroups"),  WORKGROUP("workgroup"),  LSRS("lsrs"),  LSR("lsr"),  SVC("svc"),  DCM("dcm"),  DCMS("dcms"),  OUTS("outs"),  OUT("out"),  SERVICES("services"),  SERVICE("service"),  LSRSERVICE("lsrService"),  OUTSERVICE("outService"),  DCMSERVICE("dcmService"),  ISOLATION("isolation");
  
  private String label;
  private static final String NAMESPACE = "ns:";
  private static final String SEPARATOR = "/";
  private static final String NS = "ns";
  
  private ConfigFileXPath(String label)
  {
    this.label = label;
  }
  
  public String getLabel()
  {
    return this.label;
  }
  
  private static String id(int id)
  {
    if (id == 0) {
      return "";
    }
    return "[@id=" + id + "]";
  }
  
  public static Document platformXML(Element platform)
  {
    Document document = DocumentHelper.createDocument();
    document.add((Element)platform.clone());
    
    return document;
  }
  
  public static String version()
  {
    return "ns:" + PLATFORM.label + "/" + "ns:" + VERSION.label;
  }
  
  public static String global()
  {
    return "ns:" + PLATFORM.label + "/" + "ns:" + GLOBAL.label;
  }
  
  public static String monitor()
  {
    return "ns:" + PLATFORM.label + "/" + "ns:" + MONITOR.label;
  }
  
  public static String instanceIsolate()
  {
    return global() + isolation();
  }
  
  private static String isolation()
  {
    return "/ns:" + ISOLATION.label;
  }
  
  private static Document createPlatfromDocument()
  {
    Document document = DocumentHelper.createDocument();
    document.addElement(PLATFORM.label, "http://www.w3school.com.cn");
    
    return document;
  }
  
  public static Document globalXML(Element globalEle)
  {
    Document document = createPlatfromDocument();
    document.getRootElement().add((Element)globalEle.clone());
    
    return document;
  }
  
  public static String workgroups()
  {
    return "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label;
  }
  
  public static String workgroup(int wid)
  {
    return 
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid);
  }
  
  public static String workgroupIsolate(int gid)
  {
    return workgroup(gid) + isolation();
  }
  
  public static Document workgroupXml(Element workgroupEle)
  {
    Document document = createPlatfromDocument();
    Element workgroupsEle = document.getRootElement().addElement(WORKGROUPS.label);
    workgroupsEle.add((Element)workgroupEle.clone());
    
    return document;
  }
  
  public static String lsrs(int gid)
  {
    return 
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(gid) + "/" + "ns:" + LSRS.label;
  }
  
  public static String lsr(int wid, int lid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + LSRS.label + "/" + "ns:" + LSR.label + id(lid);
  }
  
  public static Document lsrXml(Element lsrEle)
  {
    Document document = createPlatfromDocument();
    Element lsrsEle = document.getRootElement().addElement(WORKGROUPS.label).addElement(WORKGROUP.label).addElement(LSRS.label);
    lsrsEle.add((Element)lsrEle.clone());
    
    return document;
  }
  
  public static String svc(int wid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + SVC.label;
  }
  
  public static Document svcXml(Element svcEle)
  {
    Document document = createPlatfromDocument();
    Element workgroupEle = document.getRootElement().addElement(WORKGROUPS.label).addElement(WORKGROUP.label);
    workgroupEle.add((Element)svcEle.clone());
    
    return document;
  }
  
  public static String dcm(int wid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + DCM.label;
  }
  
  public static Document dcmXml(Element dcmEle)
  {
    Document document = createPlatfromDocument();
    Element workgroupEle = document.getRootElement().addElement(WORKGROUPS.label).addElement(WORKGROUP.label);
    workgroupEle.add((Element)dcmEle.clone());
    
    return document;
  }
  
  public static String outs(int gid)
  {
    return 
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(gid) + "/" + "ns:" + OUTS.label;
  }
  
  public static String out(int wid, int oid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + OUTS.label + "/" + "ns:" + OUT.label + id(oid);
  }
  
  public static Document outXml(Element outEle)
  {
    Document document = createPlatfromDocument();
    Element outsEle = document.getRootElement().addElement(WORKGROUPS.label).addElement(WORKGROUP.label).addElement(OUTS.label);
    outsEle.add((Element)outEle.clone());
    
    return document;
  }
  
  public static String lsrServices(int gid, int mid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(gid) + "/" + "ns:" + LSRS.label + "/" + "ns:" + LSR.label + id(mid) + "/" + "ns:" + SERVICES.label;
  }
  
  public static String lsrService(int wid, int lid, int sid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + LSRS.label + "/" + "ns:" + LSR.label + id(lid) + "/" + "ns:" + SERVICES.label + "/" + "ns:" + SERVICE.label + id(sid);
  }
  
  public static String lsrServiceIsolate(int gid, int mid, int sid)
  {
    return lsrService(gid, mid, sid) + isolation();
  }
  
  public static String lsrServiceOptions(int wid, int lid, int sid, String optionsLabel)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + LSRS.label + "/" + "ns:" + LSR.label + id(lid) + "/" + "ns:" + SERVICES.label + "/" + "ns:" + SERVICE.label + id(sid) + "/" + "ns:" + optionsLabel;
  }
  
  public static String dcmService(int gid, int sid, String options)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(gid) + "/" + "ns:" + DCM.label + "/" + "ns:" + SERVICES.label + "/" + "ns:" + SERVICE.label + id(sid) + "/" + "ns:" + options;
  }
  
  public static Document lsrServiceXml(Element lsrServiceEle)
  {
    Document document = createPlatfromDocument();
    Element servicesEle = document.getRootElement()
      .addElement(WORKGROUPS.label).addElement(WORKGROUP.label)
      .addElement(LSRS.label).addElement(LSR.label).addElement(SERVICES.label);
    servicesEle.add((Element)lsrServiceEle.clone());
    
    return document;
  }
  
  public static String outServices(int gid, int mid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(gid) + "/" + "ns:" + OUTS.label + "/" + "ns:" + OUT.label + id(mid) + "/" + "ns:" + SERVICES.label;
  }
  
  public static String outService(int wid, int lid, int sid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + OUTS.label + "/" + "ns:" + OUT.label + id(lid) + "/" + "ns:" + SERVICES.label + "/" + "ns:" + SERVICE.label + id(sid);
  }
  
  public static String outServiceOptions(int wid, int lid, int sid, String optionsLabel)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + OUTS.label + "/" + "ns:" + OUT.label + id(lid) + "/" + "ns:" + SERVICES.label + "/" + "ns:" + SERVICE.label + id(sid) + "/" + "ns:" + optionsLabel;
  }
  
  public static String dcmServices(int gid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(gid) + "/" + "ns:" + DCM.label + "/" + "ns:" + SERVICES.label;
  }
  
  public static String dcmService(int wid, int sid)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(wid) + "/" + "ns:" + DCM.label + "/" + "ns:" + SERVICES.label + "/" + "ns:" + SERVICE.label + id(sid);
  }
  
  public static String dcmServiceOptions(int gid, int sid, String optionsLabel)
  {
    return 
    
      "ns:" + PLATFORM.label + "/" + "ns:" + WORKGROUPS.label + "/" + "ns:" + WORKGROUP.label + id(gid) + "/" + "ns:" + DCM.label + "/" + "ns:" + SERVICES.label + "/" + "ns:" + SERVICE.label + id(sid) + "/" + "ns:" + optionsLabel;
  }
  
  public static Document outServiceXml(Element outServiceEle)
  {
    Document document = createPlatfromDocument();
    Element servicesEle = document.getRootElement()
      .addElement(WORKGROUPS.label).addElement(WORKGROUP.label)
      .addElement(OUTS.label).addElement(OUT.label).addElement(SERVICES.label);
    servicesEle.add((Element)outServiceEle.clone());
    
    return document;
  }
  
  public static Document dcmServiceXml(Element dcmServiceEle)
  {
    Document document = createPlatfromDocument();
    Element servicesEle = document.getRootElement()
      .addElement(WORKGROUPS.label).addElement(WORKGROUP.label)
      .addElement(DCM.label).addElement(SERVICES.label);
    servicesEle.add((Element)dcmServiceEle.clone());
    
    return document;
  }
  
  public static XPath createXPath(Document document, String xPath)
  {
    if (xPath == null) {
      return null;
    }
    String defaultNameSpance = document.getRootElement().getNamespaceURI();
    Map<String, String> nsMap = new HashMap();
    nsMap.put("ns", defaultNameSpance);
    XPath path = DocumentHelper.createXPath(xPath);
    path.setNamespaceURIs(nsMap);
    
    return path;
  }
  
  public static XPath createXPath(String namespaceURI, String path)
  {
    if (path == null) {
      return null;
    }
    Map<String, String> nsMap = new HashMap();
    nsMap.put("ns", namespaceURI);
    XPath xPath = DocumentHelper.createXPath(path);
    xPath.setNamespaceURIs(nsMap);
    
    return xPath;
  }
}

