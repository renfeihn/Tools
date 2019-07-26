package cn.com.agree.aweb.util;


import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.QName;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;

import cn.com.agree.afa.core.device.VDService;
import cn.com.agree.afa.core.scoreboard.DeviceState;
import cn.com.agree.afa.omi.IOperationsManager;
import cn.com.agree.afa.omi.OmiException;
import tc.cama.aweb.utils.AFAContainer;
import tc.cama.aweb.utils.ConfigManager;

public class DcmCacheConfigUtil
{
  public static final String SEPARATOR = "/";
  private static final String HOST_NAME_XPATH = ".//ns:ehcacheOptions/ns:cacheManagerPeerListenerFactory/ns:hostName";
  private static final String PORT_XPATH = ".//ns:ehcacheOptions/ns:cacheManagerPeerListenerFactory/ns:port";
  private static final String ATTR_TYPE = "type";
  private static final String ATTR_NAME = "name";
  private static final int CACHE_SERVICE_TYPE = 0;
  
  public static List<Element> selectNodes(Document root, String xPath)
  {
    XPath xPath_ = ConfigFileXPath.createXPath(root, xPath);
    List<Element> elements = xPath_.selectNodes(root);
    return elements;
  }
  
  public static List<Element> selectNodes(Element element, String xPath)
  {
    XPath xPath_ = ConfigFileXPath.createXPath(element.getNamespaceURI(), xPath);
    List<Element> elements = xPath_.selectNodes(element);
    return elements;
  }
  
  public static Element selectSingleNode(Document root, String xPath)
  {
    XPath xPath_ = ConfigFileXPath.createXPath(root, xPath);
    Element element = (Element)xPath_.selectSingleNode(root);
    return element;
  }
  
  public static Element selectSingleNode(Element element, String xPath)
  {
    XPath xPath_ = ConfigFileXPath.createXPath(element.getNamespaceURI(), xPath);
    Element ele = (Element)xPath_.selectSingleNode(element);
    return ele;
  }
  
  public static List<String> generateRmiUrlsByDoc(Document document)
    throws DocumentException
  {
    List<String> urls = new ArrayList();
    
    List<Element> servicesEle = selectNodes(document, "//ns:dcm/ns:services/ns:service");
    for (Element serviceEle : servicesEle)
    {
      String typeStr = serviceEle.attributeValue("type").trim();
      if ((typeStr != null) && (Integer.parseInt(typeStr) == 0))
      {
        Element hostNameEle = selectSingleNode(serviceEle, ".//ns:ehcacheOptions/ns:cacheManagerPeerListenerFactory/ns:hostName");
        Element portEle = selectSingleNode(serviceEle, ".//ns:ehcacheOptions/ns:cacheManagerPeerListenerFactory/ns:port");
        if ((hostNameEle != null) && (portEle != null))
        {
          String host = hostNameEle.getTextTrim();
          String port = portEle.getTextTrim();
          if ((host != null) && (!"".equals(host)) && (port != null) && (!"".equals(port)))
          {
            List<Element> caches = selectNodes(serviceEle, ".//ns:ehcacheOptions/ns:caches/ns:cache");
            if (caches.size() > 0)
            {
              StringBuffer cacheNamesSb = new StringBuffer();
              for (Element ele : caches)
              {
                String name = ele.attributeValue("name");
                cacheNamesSb.append(name + "/");
              }
              if (cacheNamesSb.length() > 0) {
                cacheNamesSb.deleteCharAt(cacheNamesSb.length() - 1);
              }
              String rmiUrl = host + ":" + port + "/" + cacheNamesSb;
              urls.add(rmiUrl);
            }
          }
        }
      }
    }
    return urls;
  }
  
//  public static void writeRmiUrls2Doc(Document document, List<String> rmiUrls)
//    throws DocumentException, IOException
//  {
//    List<Element> serviceEles = selectNodes(document, "//ns:dcm/ns:services/ns:service");
//    for (Element serviceEle : serviceEles)
//    {
//      List<String> currentUmiUrls = new ArrayList();
//      
//      Element rmiUrlsEle = selectSingleNode(serviceEle, 
//        ".//ns:ehcacheOptions/ns:cacheManagerPeerProviderFactory/ns:rmiUrls");
//      Element newRmiUrlEle;
//      if (rmiUrlsEle != null)
//      {
//        List<Element> rmiUrlEles = selectNodes(rmiUrlsEle, ".//ns:rmiUrl");
//        for (Element rmiUrlEle : rmiUrlEles) {
//          currentUmiUrls.add(rmiUrlEle.getTextTrim());
//        }
//        for (String url : rmiUrls) {
//          if (!currentUmiUrls.contains(url))
//          {
//            currentUmiUrls.add(url);
//            
//            newRmiUrlEle = 
//              DocumentHelper.createElement(QName.get("rmiUrl", rmiUrlsEle.getNamespace()));
//            newRmiUrlEle.setText(url);
//            rmiUrlsEle.add(newRmiUrlEle);
//          }
//        }
//      }
//      else
//      {
//        Element providerFactoryEle = selectSingleNode(serviceEle, 
//          ".//ns:ehcacheOptions/ns:cacheManagerPeerProviderFactory");
//        
//        Element newRmiUrlsEle = 
//          DocumentHelper.createElement(QName.get("rmiUrls", providerFactoryEle.getNamespace()));
//        for (String url : rmiUrls)
//        {
//          Element newRmiUrlEle = 
//            DocumentHelper.createElement(QName.get("rmiUrl", newRmiUrlsEle.getNamespace()));
//          newRmiUrlEle.setText(url);
//          newRmiUrlsEle.add(newRmiUrlEle);
//        }
//        providerFactoryEle.add(newRmiUrlsEle);
//      }
//    }
//  }
//  
//  public static void removeRmiUrlFromDoc(Document doc, List<String> rmiUrls)
//  {
//    List<Element> serviceEles = selectNodes(doc, "//ns:dcm/ns:services/ns:service[@type='0']");
//    for (Element serviceEle : serviceEles)
//    {
//      Element rmiUrlsEle = selectSingleNode(serviceEle, 
//        ".//ns:ehcacheOptions/ns:cacheManagerPeerProviderFactory/ns:rmiUrls");
//      if (rmiUrlsEle != null)
//      {
//        List<Element> rmiUrlEles = selectNodes(rmiUrlsEle, ".//ns:rmiUrl");
//        for (Element rmiUrlEle : rmiUrlEles) {
//          if (rmiUrls.contains(rmiUrlEle.getTextTrim())) {
//            rmiUrlsEle.remove(rmiUrlEle);
//          }
//        }
//      }
//    }
//  }
//  
//  /* Error */
//  public static void saveXml(Document doc, String savePath)
//    throws IOException
//  {
//    // Byte code:
//    //   0: invokestatic 253	org/dom4j/io/OutputFormat:createPrettyPrint	()Lorg/dom4j/io/OutputFormat;
//    //   3: astore_2
//    //   4: aload_2
//    //   5: ldc_w 259
//    //   8: invokevirtual 261	org/dom4j/io/OutputFormat:setEncoding	(Ljava/lang/String;)V
//    //   11: aconst_null
//    //   12: astore_3
//    //   13: new 264	org/dom4j/io/XMLWriter
//    //   16: dup
//    //   17: new 266	java/io/FileOutputStream
//    //   20: dup
//    //   21: aload_1
//    //   22: invokespecial 268	java/io/FileOutputStream:<init>	(Ljava/lang/String;)V
//    //   25: aload_2
//    //   26: invokespecial 269	org/dom4j/io/XMLWriter:<init>	(Ljava/io/OutputStream;Lorg/dom4j/io/OutputFormat;)V
//    //   29: astore_3
//    //   30: aload_3
//    //   31: aload_0
//    //   32: invokevirtual 272	org/dom4j/io/XMLWriter:write	(Lorg/dom4j/Document;)V
//    //   35: goto +16 -> 51
//    //   38: astore 4
//    //   40: aload_3
//    //   41: ifnull +7 -> 48
//    //   44: aload_3
//    //   45: invokevirtual 276	org/dom4j/io/XMLWriter:close	()V
//    //   48: aload 4
//    //   50: athrow
//    //   51: aload_3
//    //   52: ifnull +7 -> 59
//    //   55: aload_3
//    //   56: invokevirtual 276	org/dom4j/io/XMLWriter:close	()V
//    //   59: return
//    // Line number table:
//    //   Java source line #234	-> byte code offset #0
//    //   Java source line #235	-> byte code offset #4
//    //   Java source line #236	-> byte code offset #11
//    //   Java source line #238	-> byte code offset #13
//    //   Java source line #239	-> byte code offset #30
//    //   Java source line #240	-> byte code offset #35
//    //   Java source line #241	-> byte code offset #40
//    //   Java source line #242	-> byte code offset #44
//    //   Java source line #243	-> byte code offset #48
//    //   Java source line #241	-> byte code offset #51
//    //   Java source line #242	-> byte code offset #55
//    //   Java source line #244	-> byte code offset #59
//    // Local variable table:
//    //   start	length	slot	name	signature
//    //   0	60	0	doc	Document
//    //   0	60	1	savePath	String
//    //   3	23	2	format	org.dom4j.io.OutputFormat
//    //   12	44	3	writer	org.dom4j.io.XMLWriter
//    //   38	11	4	localObject	Object
//    // Exception table:
//    //   from	to	target	type
//    //   13	38	38	finally
//  }
//  
//  public static String getRmiUrlPreStr(Element element)
//  {
//    Element hostNameEle = selectSingleNode(element, ".//ns:ehcacheOptions/ns:cacheManagerPeerListenerFactory/ns:hostName");
//    Element portEle = selectSingleNode(element, ".//ns:ehcacheOptions/ns:cacheManagerPeerListenerFactory/ns:port");
//    if ((hostNameEle != null) && (portEle != null)) {
//      return hostNameEle.getTextTrim() + ":" + portEle.getTextTrim();
//    }
//    return null;
//  }
//  
//  public static void syncDcmCacheRmiUrl(List<AfaInstanceCtxVO> insCtxs, String newRmiUrl, String oldRmiUrl, VDService vdSrc)
//    throws OmiException, DocumentException, IOException
//  {
//    if (insCtxs != null) {
//      for (AfaInstanceCtxVO ctx : insCtxs)
//      {
//        boolean syncronized = false;
//        IOperationsManager manager = AFAContainer.getExistManager(ctx.getHost(), ctx.getPort());
//        if ((manager != null) && (AFAContainer.getManagerState(manager).equals(DeviceState.Running)))
//        {
//          byte[] contents = manager.getConfigFile().getConfigContents();
//          Document document = new SAXReader().read(new ByteArrayInputStream(contents));
//          
//          List<Element> serviceEles = selectNodes(document, "//ns:dcm/ns:services/ns:service[@type='0']");
//          for (Element serviceEle : serviceEles)
//          {
//            Element rmiUrlsEle = selectSingleNode(serviceEle, 
//              ".//ns:ehcacheOptions/ns:cacheManagerPeerProviderFactory/ns:rmiUrls");
//            if (rmiUrlsEle != null)
//            {
//              List<Element> rmiUrlEles = selectNodes(rmiUrlsEle, ".//ns:rmiUrl");
//              for (Element rmiUrlEle : rmiUrlEles)
//              {
//                String value = rmiUrlEle.getTextTrim();
//                if (value.startsWith(oldRmiUrl))
//                {
//                  rmiUrlEle.setText(value.replaceFirst(oldRmiUrl, newRmiUrl));
//                  syncronized = true;
//                }
//              }
//            }
//          }
//          if (syncronized) {
//            manager.updateDevice(ConfigManager.getByteArray(document), vdSrc);
//          }
//        }
//      }
//    }
//  }
}
