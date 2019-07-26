package tc.cama.aweb.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="afa4j_monitor_flow_statistic")
public class AfaFlowStatisticVO
  implements Serializable
{
  private static final long serialVersionUID = 8019397740402225100L;
  @Id
  @Column(name="ID", unique=true)
  private String id;
  @Column(name="MC")
  private String mc;
  @Column(name="TC")
  private String tc;
  @Column(name="EXECUTEDCOUNT")
  private String executedCount;
  @Column(name="FAILEDCOUNT")
  private String failedCount;
  @Column(name="MINEXECUTEDTIME")
  private String minExecutedTime;
  @Column(name="MAXEXECUTEDTIME")
  private String maxExecutedTime;
  @Column(name="AVGEXECUTEDTIME")
  private String avgExecutedTime;
  @Column(name="SAVEFLAG")
  private String saveFlag;
  
  public AfaFlowStatisticVO()
  {
    //this.id = CommonUtils.getShowUUID();
  }
  
  public String getId()
  {
    return this.id;
  }
  
  public void setId(String id)
  {
    this.id = id;
  }
  
  public String getMc()
  {
    return this.mc;
  }
  
  public void setMc(String mc)
  {
    this.mc = mc;
  }
  
  public String getTc()
  {
    return this.tc;
  }
  
  public void setTc(String tc)
  {
    this.tc = tc;
  }
  
  public String getExecutedCount()
  {
    return this.executedCount;
  }
  
  public void setExecutedCount(String executedCount)
  {
    this.executedCount = executedCount;
  }
  
  public String getFailedCount()
  {
    return this.failedCount;
  }
  
  public void setFailedCount(String failedCount)
  {
    this.failedCount = failedCount;
  }
  
  public String getMinExecutedTime()
  {
    return this.minExecutedTime;
  }
  
  public void setMinExecutedTime(String minExecutedTime)
  {
    this.minExecutedTime = minExecutedTime;
  }
  
  public String getMaxExecutedTime()
  {
    return this.maxExecutedTime;
  }
  
  public void setMaxExecutedTime(String maxExecutedTime)
  {
    this.maxExecutedTime = maxExecutedTime;
  }
  
  public String getAvgExecutedTime()
  {
    return this.avgExecutedTime;
  }
  
  public void setAvgExecutedTime(String avgExecutedTime)
  {
    this.avgExecutedTime = avgExecutedTime;
  }
  
  public String getSaveFlag()
  {
    return this.saveFlag;
  }
  
  public void setSaveFlag(String saveFlag)
  {
    this.saveFlag = saveFlag;
  }
}
