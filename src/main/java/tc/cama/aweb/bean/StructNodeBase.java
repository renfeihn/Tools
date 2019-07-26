package tc.cama.aweb.bean;

import cn.com.agree.afa.core.scoreboard.DeviceState;

public abstract class StructNodeBase
{
  private int gid;
  private String name;
  private DeviceState state;
  private DeviceState parentState;
  private String startupTime;
  private int restartCount;
  private AfaDeviceType type;
  private IsolateState isolateState;
  private IsolateState pIsolateState;
  
  public int getGid()
  {
    return this.gid;
  }
  
  public void setGid(int gid)
  {
    this.gid = gid;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public DeviceState getState()
  {
    return this.state;
  }
  
  public void setState(DeviceState state)
  {
    this.state = state;
  }
  
  public String getStartupTime()
  {
    return this.startupTime;
  }
  
  public DeviceState getParentState()
  {
    return this.parentState;
  }
  
  public void setParentState(DeviceState parentState)
  {
    this.parentState = parentState;
  }
  
  public void setStartupTime(String startupTime)
  {
    this.startupTime = startupTime;
  }
  
  public int getRestartCount()
  {
    return this.restartCount;
  }
  
  public void setRestartCount(int restartCount)
  {
    this.restartCount = restartCount;
  }
  
  public AfaDeviceType getType()
  {
    return this.type;
  }
  
  public void setType(AfaDeviceType type)
  {
    this.type = type;
  }
  
  public IsolateState getIsolateState()
  {
    return this.isolateState;
  }
  
  public void setIsolateState(IsolateState isolateState)
  {
    this.isolateState = isolateState;
  }
  
  public IsolateState getpIsolateState()
  {
    return this.pIsolateState;
  }
  
  public void setpIsolateState(IsolateState pIsolateState)
  {
    this.pIsolateState = pIsolateState;
  }
}

