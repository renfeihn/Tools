package tc.cama.aweb.bean;

import java.util.List;

import org.dom4j.Element;

import cn.com.agree.aweb.exception.AfaConfigException;
import cn.com.agree.aweb.util.ConfigFileXPath;
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.SchemaManager;

public class OutModuleConfigNode
  extends ConfigNodeSupport
{
  private int gid;
  private int mid;
  
  public OutModuleConfigNode(byte[] configContents, int gid, int mid)
    throws AfaConfigException
  {
    super(configContents);
    this.gid = gid;
    this.mid = mid;
  }
  
  public OutModuleConfigNode(String configStr)
    throws AfaConfigException
  {
    super(configStr, AfaDeviceType.OUT);
  }
  
  protected void initArea()
  {
    setBases(new String[] {
      "description" });
    
    setCores(new String[0]);
  }
  
  public Element getElement()
    throws AfaConfigException
  {
    Element outEle = getElementByXPath(ConfigFileXPath.out(this.gid, this.mid));
    if (outEle == null) {
      throw new AfaConfigException("����������������������������������������������");
    }
    return outEle;
  }
  
  public PageJson getPageJson(SchemaManager schema)
    throws AfaConfigException
  {
    PageJson pageJson = PageJson.allocate();
    setBaseAttribute(getElement(), pageJson, schema);
    iteratorElement(getElement(), pageJson, schema);
    return pageJson;
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
    }
  }
  
  public int getGid()
  {
    return this.gid;
  }
  
  public void setGid(int gid)
  {
    this.gid = gid;
  }
  
  public int getMid()
  {
    return this.mid;
  }
  
  public void setMid(int mid)
  {
    this.mid = mid;
  }
}
