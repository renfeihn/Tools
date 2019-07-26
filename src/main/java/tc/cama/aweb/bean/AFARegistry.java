package tc.cama.aweb.bean;


public class AFARegistry
{
  private String host;
  private int port;
  private String name;
  
  public AFARegistry(String host, int port, String name)
  {
    setHost(host);
    setPort(port);
    setName(name);
  }
  
  public void setHost(String host)
  {
    this.host = host;
  }
  
  public String getHost()
  {
    return this.host;
  }
  
  public void setPort(int port)
  {
    this.port = port;
  }
  
  public int getPort()
  {
    return this.port;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public boolean equals(Object obj)
  {
    if (obj == null) {
      return false;
    }
    if ((obj instanceof AFARegistry))
    {
      AFARegistry that = (AFARegistry)obj;
      return (this.host != null) && (this.host.equals(that.getHost())) && 
        (this.port == that.getPort());
    }
    return false;
  }
  
  public int hashCode()
  {
    return super.hashCode();
  }
  
  public String toString()
  {
    return this.host + ":" + this.port;
  }
}
