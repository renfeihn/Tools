package tc.cama.aweb.bean;
public class ServiceInfo
{
  private String address;
  private int adminPort;
  private String name;
  private String rpcIdentify;
  private int gid;
  private int mid;
  private int sid;
  
  public String getAddress()
  {
    return this.address;
  }
  
  public void setAddress(String address)
  {
    this.address = address;
  }
  
  public int getAdminPort()
  {
    return this.adminPort;
  }
  
  public void setAdminPort(int adminPort)
  {
    this.adminPort = adminPort;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public String getRpcIdentify()
  {
    return this.rpcIdentify;
  }
  
  public void setRpcIdentify(String rpcIdentify)
  {
    this.rpcIdentify = rpcIdentify;
  }
  
  public int getGid()
  {
    return this.gid;
  }
  
  public void setGid(int gid)
  {
    this.gid = gid;
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
  
  public String toString()
  {
    return 
    
      getClass().getSimpleName() + "[address=" + this.address + ",adminPort=" + this.adminPort + ",serviceName=" + this.name + ",rpcIdentify=" + this.rpcIdentify + ",gid=" + this.gid + ",mid=" + this.mid + ",sid=" + this.sid + "]";
  }
}
