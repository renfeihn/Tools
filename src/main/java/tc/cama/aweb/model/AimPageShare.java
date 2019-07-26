package tc.cama.aweb.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aim_page_share")
public class AimPageShare implements Serializable {
/**
 *id
*/
@Id
@SequenceGenerator(name = "", sequenceName = "GLOBAL")
@Column(name = "id")
private Integer id;
/**
 *分享者
*/
@Column(name = "srcusername")
private String srcusername;
/**
 *被分享
*/
@Column(name = "desusername")
private String desusername;
/**
 *分享用户组id
*/
@Column(name = "gid")
private int gid;
/**
 *@return id
*/
public Integer getId(){return this.id;}
/**
 *@param id id
*/
@Column(name = "id")
public void setId(Integer id) {this.id = id;}
/**
 *@return 分享者
*/
public String getSrcusername(){return this.srcusername;}
/**
 *@param srcusername 分享者
*/
@Column(name = "srcusername")
public void setSrcusername(String srcusername) {this.srcusername = srcusername;}
/**
 *@return 被分享
*/
public String getDesusername(){return this.desusername;}
/**
 *@param desusername 被分享
*/
@Column(name = "desusername")
public void setDesusername(String desusername) {this.desusername = desusername;}
/**
 *@return 分享用户组id
*/
public int getGid(){return this.gid;}
/**
 *@param gid 分享用户组id
*/
@Column(name = "gid")
public void setGid(int gid) {this.gid = gid;}

}