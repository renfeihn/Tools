package tc.cama.aweb.utils;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import cn.com.agree.aweb.util.ConfigFileXPath;
import tc.cama.aweb.bean.AfaDeviceType;

public class ComponentDOMFactory
{
  public static Document createComponentDocument(String configStr, AfaDeviceType deviceType)
    throws DocumentException
  {
    Document document = null;
    Element element = DocumentHelper.parseText(configStr).getRootElement();
    switch (deviceType)
    {
    case DCM: 
      document = ConfigFileXPath.platformXML(element);
      break;
    case DCMSERVICE: 
      document = ConfigFileXPath.workgroupXml(element);
      break;
    case OUTSERVICE: 
      document = ConfigFileXPath.lsrXml(element);
      break;
    case LSRSERVICE: 
      document = ConfigFileXPath.svcXml(element);
      break;
    case SERVICE: 
      document = ConfigFileXPath.outXml(element);
      break;
    case PLATFORM: 
      document = ConfigFileXPath.lsrServiceXml(element);
      break;
    case SVC: 
      document = ConfigFileXPath.outServiceXml(element);
      break;
    case OUT: 
      document = ConfigFileXPath.dcmServiceXml(element);
    }
    return document;
  }
}