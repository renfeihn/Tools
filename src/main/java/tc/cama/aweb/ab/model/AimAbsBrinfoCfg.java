package tc.cama.aweb.ab.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
@Entity
@Table(name = "aim_abs_brinfo_cfg")
public class AimAbsBrinfoCfg implements Serializable {
/**
 *机构号
*/
@Column(name = "brno")
private String brno;
/**
 *机构名称
*/
@Column(name = "brname")
private String brname;
/**
 *上级机构号
*/
@Column(name = "subrno")
private String subrno;
/**
 *上级机构名称
*/
@Column(name = "subrname")
private String subrname;
/**
 *机构性质0-网点,1-上级机构
*/
@Column(name = "brtype")
private String brtype;
/**
 *@return 机构号
*/
public String getBrno(){return this.brno;}
/**
 *@param brno 机构号
*/
@Column(name = "brno")
public void setBrno(String brno) {this.brno = brno;}
/**
 *@return 机构名称
*/
public String getBrname(){return this.brname;}
/**
 *@param brname 机构名称
*/
@Column(name = "brname")
public void setBrname(String brname) {this.brname = brname;}
/**
 *@return 上级机构号
*/
public String getSubrno(){return this.subrno;}
/**
 *@param subrno 上级机构号
*/
@Column(name = "subrno")
public void setSubrno(String subrno) {this.subrno = subrno;}
/**
 *@return 上级机构名称
*/
public String getSubrname(){return this.subrname;}
/**
 *@param subrname 上级机构名称
*/
@Column(name = "subrname")
public void setSubrname(String subrname) {this.subrname = subrname;}
/**
 *@return 机构性质0-网点,1-上级机构
*/
public String getBrtype(){return this.brtype;}
/**
 *@param brtype 机构性质0-网点,1-上级机构
*/
@Column(name = "brtype")
public void setBrtype(String brtype) {this.brtype = brtype;}

}
