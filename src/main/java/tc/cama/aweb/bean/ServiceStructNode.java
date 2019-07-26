package tc.cama.aweb.bean;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.afa.core.scoreboard.DeviceState;

public class ServiceStructNode
  extends StructNodeBase
{
  private int mid;
  private int sid;
  private ModuleType moduleType;
  private String serviceType;
  
  public ServiceStructNode(int gid, int mid, ModuleType moduleType, int sid, String name, DeviceState state, String startupTime, int restartCount, AfaDeviceType type)
  {
    super.setGid(gid);
    super.setName(name);
    super.setState(state);
    super.setStartupTime(startupTime);
    super.setRestartCount(restartCount);
    super.setType(type);
    this.mid = mid;
    this.sid = sid;
    this.moduleType = moduleType;
  }
  
  public ServiceStructNode(int gid, int mid, ModuleType moduleType, int sid, String name, DeviceState state, String startupTime, int restartCount, AfaDeviceType type, String serviceType)
  {
    this(gid, mid, moduleType, sid, name, state, startupTime, restartCount, type);
    this.serviceType = serviceType;
  }
  
  public ServiceStructNode(int gid, int mid, ModuleType moduleType, int sid, String name, DeviceState state, String startupTime, int restartCount, AfaDeviceType type, String serviceType, DeviceState parentState, IsolateState isolateState, IsolateState pIsolateState)
  {
    this(gid, mid, moduleType, sid, name, state, startupTime, restartCount, type, serviceType);
    setParentState(parentState);
    setIsolateState(isolateState);
    setpIsolateState(pIsolateState);
  }
  
  public int getMid()
  {
    return this.mid;
  }
  
  public void setMid(int mid)
  {
    this.mid = mid;
  }
  
  public int getSid()
  {
    return this.sid;
  }
  
  public void setSid(int sid)
  {
    this.sid = sid;
  }
  
  public ModuleType getModuleType()
  {
    return this.moduleType;
  }
  
  public void setModuleType(ModuleType moduleType)
  {
    this.moduleType = moduleType;
  }
  
  public String getServiceType()
  {
    return this.serviceType;
  }
  
  public void setServiceType(String serviceType)
  {
    this.serviceType = serviceType;
  }
}

