package tc.cama.aweb.utils;


import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.aweb.exception.AfaConfigException;
import cn.com.agree.aweb.util.AfaCommonUtil;
import net.sf.json.JSONArray;
import tc.cama.aweb.bean.AfaDeviceType;
import tc.cama.aweb.bean.ISchemaNode;

public class SchemaManager
{
  private SchemaBundle bundle;
  private SchemaConfGenerator generator;
  private static HashMap<String, SchemaManager> managers = new HashMap();
  private Document document;
  
  private SchemaManager(Document document)
  {
    this.document = document;
    
    Element root = document.getRootElement();
    
    this.bundle = new SchemaBundle(root);
    this.generator = new SchemaConfGenerator(root);
  }
  
  public static SchemaManager getSchemaManager(String version)
  {
    if (managers.containsKey(version)) {
      return (SchemaManager)managers.get(version);
    }
    return null;
  }
  
  public static SchemaManager createSchemaManager(byte[] contents)
    throws AfaConfigException
  {
    try
    {
      SAXReader reader = new SAXReader();
      Document document = reader.read(new ByteArrayInputStream(contents));
      
      String version = AfaCommonUtil.getSchemaVersion(contents);
      synchronized (managers)
      {
        if (!managers.containsKey(version)) {
          managers.put(version, new SchemaManager(document));
        }
      }
      return (SchemaManager)managers.get(version);
    }
    catch (DocumentException e)
    {
      throw new AfaConfigException(e);
    }
  }
  
  public static synchronized void removeSchemaManager(String version)
  {
    if ((version != null) && (managers.containsKey(version))) {
      managers.remove(version);
    }
  }
  
  public ISchemaNode getSchemaNode(String xPath)
  {
    return this.bundle.get(xPath);
  }
  
  public ISchemaNode getCustomSchemaNode(String xPath)
  {
    return this.bundle.getCustomInfo(xPath);
  }
  
  public Element getConfigNode(AfaDeviceType devType, boolean isComponent)
  {
    return this.generator.get(devType, isComponent);
  }
  
  public Element getConfigNode(AfaDeviceType moduleType, String serviceType)
  {
    return this.generator.get(moduleType, serviceType);
  }
  
  public List<Element> getServiceTypeEnumNodes(ModuleType moduleType)
  {
    return this.generator.getServiceTypeEnumNodes(moduleType);
  }
  
  public JSONArray getServiceTypes(ModuleType moduleType)
  {
    return this.generator.getServiceTypes(moduleType);
  }
  
  public boolean getDevIsolatedFlag(AfaDeviceType devType, String... serviceType)
  {
    return this.generator.getDevIsolatedFlag(devType, serviceType);
  }
  
  public Document getDocument()
  {
    return this.document;
  }
}
