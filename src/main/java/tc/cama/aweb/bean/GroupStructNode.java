package tc.cama.aweb.bean;

import java.util.ArrayList;
import java.util.List;

import cn.com.agree.afa.core.scoreboard.DeviceState;

public class GroupStructNode
  extends StructNodeBase
{
  private List<ModuleStructNode> lsrs = new ArrayList();
  private List<ModuleStructNode> outs = new ArrayList();
  private List<ModuleStructNode> svcs = new ArrayList();
  private List<ModuleStructNode> dcm = new ArrayList();
  
  public GroupStructNode(int gid, String name, DeviceState state, String startupTime, int restartCount, AfaDeviceType type)
  {
    super.setGid(gid);
    super.setName(name);
    super.setState(state);
    super.setStartupTime(startupTime);
    super.setRestartCount(restartCount);
    super.setType(type);
  }
  
  public GroupStructNode(int gid, String name, DeviceState state, String startupTime, int restartCount, AfaDeviceType type, DeviceState parentState, IsolateState isolateState, IsolateState pIsolateState)
  {
    this(gid, name, state, startupTime, restartCount, type);
    setParentState(parentState);
    setIsolateState(isolateState);
    setpIsolateState(pIsolateState);
  }
  
  public List<ModuleStructNode> getLsrs()
  {
    return this.lsrs;
  }
  
  public void setLsrs(List<ModuleStructNode> lsrs)
  {
    this.lsrs = lsrs;
  }
  
  public List<ModuleStructNode> getOuts()
  {
    return this.outs;
  }
  
  public void setOuts(List<ModuleStructNode> outs)
  {
    this.outs = outs;
  }
  
  public List<ModuleStructNode> getSvcs()
  {
    return this.svcs;
  }
  
  public void setSvcs(List<ModuleStructNode> svcs)
  {
    this.svcs = svcs;
  }
  
  public List<ModuleStructNode> getDcm()
  {
    return this.dcm;
  }
  
  public void setDcm(List<ModuleStructNode> dcm)
  {
    this.dcm = dcm;
  }
}
