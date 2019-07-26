package tc.cama.aweb.bean;


import java.util.List;

public class SimpleSchemaAttribute
{
  private String name;
  private String type;
  private String use;
  private String desp;
  private String def;
  private boolean customizable;
  private boolean autoApply;
  private List<?> enumeration;
  
  public String getName()
  {
    return this.name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public String getType()
  {
    return this.type;
  }
  
  public void setType(String type)
  {
    this.type = type;
  }
  
  public String getUse()
  {
    return this.use;
  }
  
  public void setUse(String use)
  {
    this.use = use;
  }
  
  public String getDesp()
  {
    return this.desp;
  }
  
  public void setDesp(String desp)
  {
    this.desp = desp;
  }
  
  public String getDef()
  {
    return this.def;
  }
  
  public void setDef(String def)
  {
    this.def = def;
  }
  
  public boolean isCustomizable()
  {
    return this.customizable;
  }
  
  public void setCustomizable(String customizable)
  {
    this.customizable = Boolean.valueOf(customizable).booleanValue();
  }
  
  public boolean isAutoApply()
  {
    return this.autoApply;
  }
  
  public void setAutoApply(String autoApply)
  {
    this.autoApply = Boolean.valueOf(autoApply).booleanValue();
  }
  
  public List<?> getEnumeration()
  {
    return this.enumeration;
  }
  
  public void setEnumeration(List<?> enumeration)
  {
    this.enumeration = enumeration;
  }
}
