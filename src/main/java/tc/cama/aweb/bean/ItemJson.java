package tc.cama.aweb.bean;

import net.sf.json.JSONArray;

public class ItemJson
{
  private String nodeType;
  private String xPath;
  private String name;
  private String desp;
  private String value;
  private String type;
  private String use;
  private String uniqueId;
  private boolean customizable;
  private boolean autoApply;
  private int maxOccurs;
  private int minOccurs;
  private int maxLength;
  private int minLength;
  private float maxInclusive;
  private float minExclusive;
  private String def;
  private SimpleSchemaEnum[] enums;
  private JSONArray attrs;
  
  public void addAttr(ItemJson json)
  {
    computeAttrsField().add(json);
  }
  
  private JSONArray computeAttrsField()
  {
    JSONArray result = this.attrs;
    if (result == null) {
      this.attrs = (result = new JSONArray());
    }
    return result;
  }
  
  public String getNodeType()
  {
    return this.nodeType;
  }
  
  public void setNodeType(String nodeType)
  {
    this.nodeType = nodeType;
  }
  
  public String getxPath()
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
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public String getDesp()
  {
    return this.desp;
  }
  
  public void setDesp(String desp)
  {
    this.desp = desp;
  }
  
  public String getValue()
  {
    return this.value;
  }
  
  public void setValue(String value)
  {
    this.value = value;
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
  
  public String getUniqueId()
  {
    return this.uniqueId;
  }
  
  public void setUniqueId(String uniqueId)
  {
    this.uniqueId = uniqueId;
  }
  
  public boolean isCustomizable()
  {
    return this.customizable;
  }
  
  public void setCustomizable(boolean customizable)
  {
    this.customizable = customizable;
  }
  
  public boolean isAutoApply()
  {
    return this.autoApply;
  }
  
  public void setAutoApply(boolean autoApply)
  {
    this.autoApply = autoApply;
  }
  
  public int getMaxOccurs()
  {
    return this.maxOccurs;
  }
  
  public void setMaxOccurs(int maxOccurs)
  {
    this.maxOccurs = maxOccurs;
  }
  
  public int getMinOccurs()
  {
    return this.minOccurs;
  }
  
  public void setMinOccurs(int minOccurs)
  {
    this.minOccurs = minOccurs;
  }
  
  public int getMaxLength()
  {
    return this.maxLength;
  }
  
  public void setMaxLength(int maxLength)
  {
    this.maxLength = maxLength;
  }
  
  public int getMinLength()
  {
    return this.minLength;
  }
  
  public void setMinLength(int minLength)
  {
    this.minLength = minLength;
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
  
  public void setMinExclusive(float minInclusive)
  {
    this.minExclusive = minInclusive;
  }
  
  public String getDef()
  {
    return this.def;
  }
  
  public void setDef(String def)
  {
    this.def = def;
  }
  
  public SimpleSchemaEnum[] getEnums()
  {
    return this.enums;
  }
  
  public void setEnums(SimpleSchemaEnum[] enums)
  {
    this.enums = enums;
  }
  
  public JSONArray getAttrs()
  {
    return this.attrs;
  }
}

