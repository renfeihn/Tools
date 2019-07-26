package tc.cama.aweb.bean;

import cn.com.agree.aweb.exception.AfaConfigException;
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.SchemaManager;

public abstract class ServiceConfigNode
  extends ConfigNodeSupport
{
  PageJson pageJson;
  
  public ServiceConfigNode(byte[] contents)
    throws AfaConfigException
  {
    super(contents);
  }
  
  public ServiceConfigNode(String configStr, AfaDeviceType deviceType)
    throws AfaConfigException
  {
    super(configStr, deviceType);
  }
  
  public PageJson pageJson()
  {
    return this.pageJson;
  }
  
  public void initPageJson(SchemaManager schema)
    throws AfaConfigException
  {
    this.pageJson = getPageJson(schema);
  }
  
  public abstract String getServiceType();
}