package tc.cama.aweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aweb_ws_share")
public class AwebWsShare implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = -3559773098049600827L;
@Id
@SequenceGenerator(name = "", sequenceName = "GLOBAL")
@Column(name = "id")
private Integer id;
/**
 *页面id
*/
@Column(name = "pageid")
private int pageid;
@Column(name = "username")
private String username;
/**
 *@return %s
*/
public Integer getId(){return this.id;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setId(Integer id) {this.id = id;}
/**
 *@return 页面id
*/
public int getPageid(){return this.pageid;}
/**
 *@param pageid 页面id
*/
@Column(name = "pageid")
public void setPageid(int pageid) {this.pageid = pageid;}
/**
 *@return %s
*/
public String getUsername(){return this.username;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setUsername(String username) {this.username = username;}

}