package tc.cama.aweb.model;


import cn.com.agree.aweb.util.CommonUtils;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="afa4j_workgroup")
public class AfaWorkgroupVO
  implements Serializable
{
  private static final long serialVersionUID = -562479208112772724L;
  @Id
  @Column(name="ID", nullable=false, unique=true)
  private String id;
  @Column(name="NODEID")
  private String nodeId;
  @Column(name="NAME")
  private String name;
  
  public AfaWorkgroupVO() {}
  
  public AfaWorkgroupVO(String managerKey, int gid, String name)
  {
    this.id = CommonUtils.getShowUUID();
    this.nodeId = (managerKey + ":" + gid);
    this.name = name;
  }
  
  public AfaWorkgroupVO(String host, int port, int gid, String name)
  {
    this.id = CommonUtils.getShowUUID();
    this.nodeId = (host + ":" + port + ":" + gid);
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
  
  public String getNodeId()
  {
    return this.nodeId;
  }
  
  public void setNodeId(String nodeId)
  {
    this.nodeId = nodeId;
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
