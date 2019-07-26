package tc.cama.aweb.model;


import cn.com.agree.aweb.util.CommonUtils;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="afa4j_instance")
public class AfaInstanceVO
  implements Serializable
{
  private static final long serialVersionUID = -562479208112772724L;
  @Id
  @Column(name="ID")
  private String id;
  @Column(name="HOST")
  private String host;
  @Column(name="PORT")
  private int port;
  @Column(name="NAME")
  private String name;
  @Column(name="CLUSTERNAME")
  private String clustername;
  @Column(name="SCHEMAVERSION")
  private String schemaVersion;
  
  public AfaInstanceVO() {}
  
  public AfaInstanceVO(String host, int port, String name)
  {
    this.id = CommonUtils.getShowUUID();
    this.host = host;
    this.port = port;
    this.name = name;
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
  
  public String getId()
  {
    return this.id;
  }
  
  public void setId(String id)
  {
    this.id = id;
  }
  
  public String getClustername()
  {
    return this.clustername;
  }
  
  public void setClustername(String clustername)
  {
    this.clustername = clustername;
  }
  
  public String getSchemaVersion()
  {
    return this.schemaVersion;
  }
  
  public void setSchemaVersion(String schemaVersion)
  {
    this.schemaVersion = schemaVersion;
  }
}