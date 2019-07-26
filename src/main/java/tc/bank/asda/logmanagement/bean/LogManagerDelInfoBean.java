package tc.bank.asda.logmanagement.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aim_log_manager_del_execinfo")
public class LogManagerDelInfoBean implements Serializable {
	private static final long serialVersionUID = -3108067193282331150L;
	@Column(name = "host")
	private String host;
	@Column(name = "id")
	private int id;
	@Column(name = "del_host")
	private String delHost;
	@Column(name = "is_success")
	private int isSuccess;
	@Column(name = "duration")
	private int duration;
	@Column(name = "start")
	private String start;
	@Column(name = "stop")
	private String stop;
	@Column(name = "comments")
	private String comments;
	
	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDelHost() {
		return delHost;
	}

	public void setDelHost(String delHost) {
		this.delHost = delHost;
	}

	public int getIsSuccess() {
		return isSuccess;
	}

	public void setIsSuccess(int isSuccess) {
		this.isSuccess = isSuccess;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getStop() {
		return stop;
	}

	public void setStop(String stop) {
		this.stop = stop;
	}
}
