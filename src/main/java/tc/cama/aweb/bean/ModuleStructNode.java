package tc.cama.aweb.bean;

import java.util.ArrayList;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.afa.core.scoreboard.DeviceState;

public class ModuleStructNode
  extends StructNodeBase
{
  private int mid;
  private ModuleType moduleType;
  private ArrayList<ServiceStructNode> services = new ArrayList();
  
  public ModuleStructNode(int gid, int mid, ModuleType moduleType, String name, DeviceState state, String startupTime, int restartCount, AfaDeviceType type)
  {
    super.setGid(gid);
    super.setName(name);
    super.setState(state);
    super.setStartupTime(startupTime);
    super.setRestartCount(restartCount);
    super.setType(type);
    this.mid = mid;
    this.moduleType = moduleType;
  }
  
  public ModuleStructNode(int gid, int mid, ModuleType moduleType, String name, DeviceState state, String startupTime, int restartCount, AfaDeviceType type, DeviceState parentState, IsolateState isolateState, IsolateState pIsolateState)
  {
    this(gid, mid, moduleType, name, state, startupTime, restartCount, type);
    setParentState(parentState);
    setIsolateState(isolateState);
    setpIsolateState(pIsolateState);
  }
  
  public void setServices(ArrayList<ServiceStructNode> services)
  {
    this.services = services;
  }
  
  public ArrayList<ServiceStructNode> getServices()
  {
    return this.services;
  }
  
  public int getMid()
  {
    return this.mid;
  }
  
  public void setMid(int mid)
  {
    this.mid = mid;
  }
  
  public ModuleType getModuleType()
  {
    return this.moduleType;
  }
  
  public void setModuleType(ModuleType moduleType)
  {
    this.moduleType = moduleType;
  }
}

