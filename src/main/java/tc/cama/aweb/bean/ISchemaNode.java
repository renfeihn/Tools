package tc.cama.aweb.bean;


import java.util.List;

public abstract interface ISchemaNode
{
  public abstract String getXPath();
  
  public abstract String getName();
  
  public abstract String getAnnotation();
  
  public abstract boolean isCustomizable();
  
  public abstract boolean isAutoApply();
  
  public abstract List<?> getEnumeration();
  
  public abstract List<SimpleSchemaAttribute> getAttributes();
  
  public abstract String getDef();
  
  public abstract String getRef();
  
  public abstract String getType();
  
  public abstract String getUse();
  
  public abstract int getMaxOccurs();
  
  public abstract int getMinOccurs();
  
  public abstract int getMaxLength();
  
  public abstract int getMinLength();
  
  public abstract float getMaxInclusive();
  
  public abstract float getMinExclusive();
  
  public abstract List<String> getxPathOfChild();
}