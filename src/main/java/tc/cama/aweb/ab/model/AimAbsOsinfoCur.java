package tc.cama.aweb.ab.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
@Entity
@Table(name = "aim_abs_osinfo_cur")
public class AimAbsOsinfoCur implements Serializable {
/**
 *ip
*/
@Column(name = "ip")
private String ip;
/**
 *代理名称
*/
@Column(name = "agentname")
private String agentname;
/**
 *生产厂商
*/
@Column(name = "jvmcompany")
private String jvmcompany;
/**
 *jvm版本
*/
@Column(name = "jvmver")
private String jvmver;
/**
 *虚拟机启动时间
*/
@Column(name = "jvmstarttime")
private String jvmstarttime;
/**
 *输入参数
*/
@Column(name = "jvmargs")
private String jvmargs;
/**
 *安装路径
*/
@Column(name = "jvminspath")
private String jvminspath;
@Column(name = "archname")
private String archname;
/**
 *操作系统名称
*/
@Column(name = "osname")
private String osname;
/**
 *cpu数量
*/
@Column(name = "oscpunum")
private String oscpunum;
/**
 *版本
*/
@Column(name = "osver")
private String osver;
/**
 *备注1: 备用字段1
*/
@Column(name = "note1")
private String note1;
/**
 *备注2: 备用字段2
*/
@Column(name = "note2")
private String note2;
/**
 *@return ip
*/
public String getIp(){return this.ip;}
/**
 *@param ip ip
*/
@Column(name = "ip")
public void setIp(String ip) {this.ip = ip;}
/**
 *@return 代理名称
*/
public String getAgentname(){return this.agentname;}
/**
 *@param agentname 代理名称
*/
@Column(name = "agentname")
public void setAgentname(String agentname) {this.agentname = agentname;}
/**
 *@return 生产厂商
*/
public String getJvmcompany(){return this.jvmcompany;}
/**
 *@param jvmcompany 生产厂商
*/
@Column(name = "jvmcompany")
public void setJvmcompany(String jvmcompany) {this.jvmcompany = jvmcompany;}
/**
 *@return jvm版本
*/
public String getJvmver(){return this.jvmver;}
/**
 *@param jvmver jvm版本
*/
@Column(name = "jvmver")
public void setJvmver(String jvmver) {this.jvmver = jvmver;}
/**
 *@return 虚拟机启动时间
*/
public String getJvmstarttime(){return this.jvmstarttime;}
/**
 *@param jvmstarttime 虚拟机启动时间
*/
@Column(name = "jvmstarttime")
public void setJvmstarttime(String jvmstarttime) {this.jvmstarttime = jvmstarttime;}
/**
 *@return 输入参数
*/
public String getJvmargs(){return this.jvmargs;}
/**
 *@param jvmargs 输入参数
*/
@Column(name = "jvmargs")
public void setJvmargs(String jvmargs) {this.jvmargs = jvmargs;}
/**
 *@return 安装路径
*/
public String getJvminspath(){return this.jvminspath;}
/**
 *@param jvminspath 安装路径
*/
@Column(name = "jvminspath")
public void setJvminspath(String jvminspath) {this.jvminspath = jvminspath;}
/**
 *@return %s
*/
public String getArchname(){return this.archname;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setArchname(String archname) {this.archname = archname;}
/**
 *@return 操作系统名称
*/
public String getOsname(){return this.osname;}
/**
 *@param osname 操作系统名称
*/
@Column(name = "osname")
public void setOsname(String osname) {this.osname = osname;}
/**
 *@return cpu数量
*/
public String getOscpunum(){return this.oscpunum;}
/**
 *@param oscpunum cpu数量
*/
@Column(name = "oscpunum")
public void setOscpunum(String oscpunum) {this.oscpunum = oscpunum;}
/**
 *@return 版本
*/
public String getOsver(){return this.osver;}
/**
 *@param osver 版本
*/
@Column(name = "osver")
public void setOsver(String osver) {this.osver = osver;}
/**
 *@return 备注1: 备用字段1
*/
public String getNote1(){return this.note1;}
/**
 *@param note1 备注1: 备用字段1
*/
@Column(name = "note1")
public void setNote1(String note1) {this.note1 = note1;}
/**
 *@return 备注2: 备用字段2
*/
public String getNote2(){return this.note2;}
/**
 *@param note2 备注2: 备用字段2
*/
@Column(name = "note2")
public void setNote2(String note2) {this.note2 = note2;}

}