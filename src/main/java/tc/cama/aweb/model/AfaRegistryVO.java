package tc.cama.aweb.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="afa4j_registry")
public class AfaRegistryVO
  implements Serializable
{
  private static final long serialVersionUID = 1858483119154497975L;
  @Id
  @Column(name="ID")
  private String id;
  @Column(name="HOST")
  private String host;
  @Column(name="PORT")
  private int port;
  @Column(name="NAME")
  private String name;
  
  public AfaRegistryVO()
  {
    
  }
  
  public AfaRegistryVO(String host, int port, String name)
  {
    this.host = host;
    this.port = port;
    this.name = name;
   // this.id = CommonUtils.getShowUUID();
  }
  
  public String getId()
  {
    return this.id;
  }
  
  public void setId(String id)
  {
    this.id = id;
  }
  
  public String getHost()
  {
    return this.host;
  }
  
  public void setHost(String host)
  {
    this.host = host;
  }
  
  public int getPort()
  {
    return this.port;
  }
  
  public void setPort(int port)
  {
    this.port = port;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
}
