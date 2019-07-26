package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aim_abs_comm_log_msg")
public class AimAbsCommLogMsg implements Serializable {
/**
 *ID
*/
@Id
@SequenceGenerator(name = "", sequenceName = "GLOBAL")
@Column(name = "id")
private Integer id;
/**
 *通报报文内容
*/
@Column(name = "message")
private String message;
/**
 *@return ID
*/
public Integer getId(){return this.id;}
/**
 *@param id ID
*/
@Column(name = "id")
public void setId(Integer id) {this.id = id;}
/**
 *@return 通报报文内容
*/
public String getMessage(){return this.message;}
/**
 *@param message 通报报文内容
*/
@Column(name = "message")
public void setMessage(String message) {this.message = message;}

}