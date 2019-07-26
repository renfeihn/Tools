package tc.cama.aweb.bean;


public enum DeviceState
{
  Starting,  Running,  Stopping,  Stopped,  Suspending,  Suspended,  Resuming,  Unknown;
  
  private DeviceState() {}
}
