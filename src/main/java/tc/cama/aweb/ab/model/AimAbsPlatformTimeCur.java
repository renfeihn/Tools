package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abs_platform_time_cur")
public class AimAbsPlatformTimeCur implements Serializable {	

private static final long serialVersionUID = 1L;
/**
 *对象id
*/
@Column(name = "mobj_id")
private int mobjId;
/**
 *上次体检时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "inspect_time")
private Date inspectTime;
/**
 *@return 对象id
*/
public int getMobjId(){return this.mobjId;}
/**
 *@param mobjId 对象id
*/
@Column(name = "mobj_id")
public void setMobjId(int mobjId) {this.mobjId = mobjId;}
/**
 *@return 上次体检时间
*/
public Date getInspectTime(){return this.inspectTime;}
/**
 *@param inspectTime 上次体检时间
*/
@Column(name = "inspect_time")
public void setInspectTime(Date inspectTime) {this.inspectTime = inspectTime;}


}