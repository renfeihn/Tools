package tc.cama.aweb.ab.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
@Entity
@Table(name = "aim_abs_ipmsg")
public class AimAbsIpmsg implements Serializable {
/**
 *ip地址
*/
@Column(name = "ip")
private String ip;
/**
 *类型1-生产,0-灾备
*/
@Column(name = "type")
private String type;
/**
 *@return ip地址
*/
public String getIp(){return this.ip;}
/**
 *@param ip ip地址
*/
@Column(name = "ip")
public void setIp(String ip) {this.ip = ip;}
/**
 *@return 类型1-生产,0-灾备
*/
public String getType(){return this.type;}
/**
 *@param type 类型1-生产,0-灾备
*/
@Column(name = "type")
public void setType(String type) {this.type = type;}

}
