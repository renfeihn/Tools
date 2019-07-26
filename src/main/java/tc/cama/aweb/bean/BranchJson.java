package tc.cama.aweb.bean;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class BranchJson
{ 
  private String name;
  private String desp;
  private String nodeType;
  private String use;
  private String uniqueId;
  private boolean customizable;
  private boolean autoApply;
  private int maxOccurs;
  private int minOccurs;
  private String xPath;
  private JSONArray attrs;
  private JSONArray nodes;
  private JSONArray child;
  private JSONObject appendNode;
  
  public BranchJson()
  {
    this.attrs = new JSONArray();
    this.nodes = new JSONArray();
    this.child = new JSONArray();
  }
  
  public void addAttr(ItemJson json)
  {
    this.attrs.add(json);
  }
  
  public void addNodes(ItemJson json)
  {
    this.nodes.add(json);
  }
  
  public void addChild(BranchJson json)
  {
    this.child.add(json);
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
  
  public String getNodeType()
  {
    return this.nodeType;
  }
  
  public void setNodeType(String nodeType)
  {
    this.nodeType = nodeType;
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
  
  public String getxPath()
  {
    return this.xPath;
  }
  
  public void setxPath(String xPath)
  {
    this.xPath = xPath;
  }
  
  public JSONArray getAttrs()
  {
    return this.attrs;
  }
  
  public JSONArray getNodes()
  {
    return this.nodes;
  }
  
  public JSONArray getChild()
  {
    return this.child;
  }
  
  public JSONObject getAppendNode()
  {
    return this.appendNode;
  }
  
  public void setAppendNode(JSONObject appendNode)
  {
    this.appendNode = appendNode;
  }
}

