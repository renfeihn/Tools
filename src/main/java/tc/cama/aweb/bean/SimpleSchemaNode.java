package tc.cama.aweb.bean;
import java.util.ArrayList;
import java.util.List;
import net.sf.json.JSONObject;

public class SimpleSchemaNode
  implements ISchemaNode
{
  private String xPath;
  private String name;
  private boolean customizable;
  private boolean autoApply;
  private int minOccurs;
  private int maxOccurs;
  private int minLength;
  private int maxLength;
  private float minExclusive;
  private float maxInclusive;
  private String ref;
  private String type;
  private String def;
  private String annotation;
  private String use;
  private List<?> attributes;
  private List<?> enumeration;
  private List<String> xPathOfChild;
  
  public String getXPath()
  {
    return this.xPath;
  }
  
  public void setxPath(String xPath)
  {
    this.xPath = xPath;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public int getMinOccurs()
  {
    return this.minOccurs;
  }
  
  public int getMaxOccurs()
  {
    return this.maxOccurs;
  }
  
  public int getMinLength()
  {
    return this.minLength;
  }
  
  public int getMaxLength()
  {
    return this.maxLength;
  }
  
  public float getMaxInclusive()
  {
    return this.maxInclusive;
  }
  
  public void setMaxInclusive(float maxInclusive)
  {
    this.maxInclusive = maxInclusive;
  }
  
  public float getMinExclusive()
  {
    return this.minExclusive;
  }
  
  public void setMinExclusive(float minExclusive)
  {
    this.minExclusive = minExclusive;
  }
  
  public String getRef()
  {
    return this.ref;
  }
  
  public String getType()
  {
    return this.type;
  }
  
  public String getDef()
  {
    return this.def;
  }
  
  public List<SimpleSchemaAttribute> getAttributes()
  {
    return (List<SimpleSchemaAttribute>) this.attributes;
  }
  
  public List<?> getEnumeration()
  {
    return this.enumeration;
  }
  
  public List<String> getxPathOfChild()
  {
    return this.xPathOfChild;
  }
  
  public void setxPathOfChild(List<?> list)
  {
    this.xPathOfChild = (List<String>) list;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public void setMinOcccurs(String minOcccurs)
  {
    try
    {
      this.minOccurs = (minOcccurs == null ? 
        0 : 
        Integer.parseInt(minOcccurs));
    }
    catch (Throwable e)
    {
      this.minOccurs = 0;
    }
  }
  
  public void setMaxOccurs(String maxOccurs)
  {
    try
    {
      this.maxOccurs = (maxOccurs == null ? 
        0 : 
        Integer.parseInt(maxOccurs));
    }
    catch (Throwable e)
    {
      this.maxOccurs = Integer.MAX_VALUE;
    }
  }
  
  public void setMinLength(String minLength)
  {
    try
    {
      this.minLength = (minLength == null ? 
        0 : 
        Integer.parseInt(minLength));
    }
    catch (Throwable e)
    {
      this.minLength = 0;
    }
  }
  
  public void setMaxLength(String maxLength)
  {
    try
    {
      this.maxLength = (maxLength == null ? 
        0 : 
        Integer.parseInt(maxLength));
    }
    catch (Throwable e)
    {
      this.maxLength = Integer.MAX_VALUE;
    }
  }
  
  public void setMinExclusive(String minExclusive)
  {
    try
    {
      this.minExclusive = 
      
        (minExclusive == null ? 0 : Integer.parseInt(minExclusive));
    }
    catch (Throwable e)
    {
      this.minExclusive = 0.0F;
    }
  }
  
  public void setMaxInclusive(String maxInclusive)
  {
    try
    {
      this.maxInclusive = 
      
        (maxInclusive == null ? 0 : Integer.parseInt(maxInclusive));
    }
    catch (Throwable e)
    {
      this.maxLength = 1;
    }
  }
  
  public void setRef(String ref)
  {
    this.ref = ref;
  }
  
  public void setType(String type)
  {
    this.type = type;
  }
  
  public void setDef(String def)
  {
    this.def = def;
  }
  
  public void setAttributes(List<?> list)
  {
    this.attributes = list;
  }
  
  public void setEnumeration(List<?> enumeration)
  {
    this.enumeration = enumeration;
  }
  
  public String getAnnotation()
  {
    return this.annotation;
  }
  
  public void setAnnotation(String annotation)
  {
    this.annotation = annotation;
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
  
  public void setUse(String use)
  {
    this.use = use;
  }
  
  public String getUse()
  {
    return this.use;
  }
  
  public String toString()
  {
    return JSONObject.fromObject(this).toString();
  }
  
  public SimpleSchemaNode clone()
  {
    SimpleSchemaNode node = new SimpleSchemaNode();
    
    node.setxPath(cloneString(this.xPath));
    node.setName(cloneString(this.name));
    node.setCustomizable(String.valueOf(this.customizable));
    node.setMinOcccurs(String.valueOf(this.minOccurs));
    node.setMaxOccurs(String.valueOf(this.maxOccurs));
    node.setRef(cloneString(this.ref));
    node.setType(cloneString(this.type));
    node.setDef(cloneString(this.def));
    node.setAnnotation(cloneString(this.annotation));
    node.setUse(cloneString(this.use));
    node.setAttributes(cloneList(this.attributes));
    node.setEnumeration(cloneList(this.enumeration));
    node.setxPathOfChild(cloneList(this.xPathOfChild));
    
    return node;
  }
  
  private String cloneString(String str)
  {
    if (str == null) {
      return null;
    }
    return new String(str);
  }
  
  private List<?> cloneList(List<?> list)
  {
    if (list == null) {
      return null;
    }
    return new ArrayList(list);
  }
}
