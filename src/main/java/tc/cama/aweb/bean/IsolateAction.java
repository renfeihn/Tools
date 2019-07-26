package tc.cama.aweb.bean;


public enum IsolateAction
{
  ISOLATE("true", "隔离"),  CANCEL("false", "取消隔离");
  
  private String action;
  private String desp;
  
  private IsolateAction(String action, String desp)
  {
    this.action = action;
    this.desp = desp;
  }
  
  public String getAction()
  {
    return this.action;
  }
  
  public String getDesp()
  {
    return this.desp;
  }
}