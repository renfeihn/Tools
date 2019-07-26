package tc.cama.aweb.bean;

import java.util.List;

public class SimpleSchemaEnum
{
  private String value;
  private String documentation;
  private String options;
  private String canIsolate;
  private List<ItemJson> appInfo;
  
  public SimpleSchemaEnum(String value, String documentation)
  {
    this.value = value;
    this.documentation = documentation;
  }
  
  public SimpleSchemaEnum(String value, String documentation, String options)
  {
    this(value, documentation);
    this.options = options;
  }
  
  public SimpleSchemaEnum(String value, String documentation, String options, String canIsolate)
  {
    this(value, documentation, options);
    this.canIsolate = canIsolate;
  }
  
  public SimpleSchemaEnum(String value, String documentation, List<ItemJson> appInfo)
  {
    this(value, documentation);
    this.appInfo = appInfo;
  }
  
  public String getValue()
  {
    return this.value;
  }
  
  public void setValue(String value)
  {
    this.value = value;
  }
  
  public String getDocumentation()
  {
    return this.documentation;
  }
  
  public void setDocumentation(String documentation)
  {
    this.documentation = documentation;
  }
  
  public String getOptions()
  {
    return this.options;
  }
  
  public void setOptions(String options)
  {
    this.options = options;
  }
  
  public String getCanIsolate()
  {
    return this.canIsolate;
  }
  
  public void setCanIsolate(String canIsolate)
  {
    this.canIsolate = canIsolate;
  }
  
  public List<ItemJson> getAppInfo()
  {
    return this.appInfo;
  }
  
  public void setAppInfo(List<ItemJson> appInfo)
  {
    this.appInfo = appInfo;
  }
}
