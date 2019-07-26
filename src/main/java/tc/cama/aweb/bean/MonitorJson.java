package tc.cama.aweb.bean;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class MonitorJson
{
  private String name;
  private String desp;
  private String xPath;
  private String uniqueId;
  private boolean customizable;
  private ItemJson usable;
  private JSONArray nodes;
  private JSONArray child;
  private JSONObject appendNode;
  private SwitchJson aimOptions;
  
  public MonitorJson(String name)
  {
    this.name = name;
    this.nodes = new JSONArray();
    this.child = new JSONArray();
  }
  
  public void addNodes(ItemJson json)
  {
    this.nodes.add(json);
  }
  
  public void addChild(Object object)
  {
    this.child.add(object);
  }
  
  public void setDesp(String desp)
  {
    this.desp = desp;
  }
  
  public void setxPath(String xPath)
  {
    this.xPath = xPath;
  }
  
  public void setUniqueId(String uniqueId)
  {
    this.uniqueId = uniqueId;
  }
  
  public void setUsable(ItemJson usable)
  {
    this.usable = usable;
  }
  
  public void setAppendNode(JSONObject appendNode)
  {
    this.appendNode = appendNode;
  }
  
  public void setAimOptions(SwitchJson aimOptions)
  {
    this.aimOptions = aimOptions;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public String getDesp()
  {
    return this.desp;
  }
  
  public String getxPath()
  {
    return this.xPath;
  }
  
  public String getUniqueId()
  {
    return this.uniqueId;
  }
  
  public ItemJson getUsable()
  {
    return this.usable;
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
  
  public SwitchJson getAimOptions()
  {
    return this.aimOptions;
  }
  
  public boolean isCustomizable()
  {
    return this.customizable;
  }
  
  public void setCustomizable(boolean customizable)
  {
    this.customizable = customizable;
  }
}
