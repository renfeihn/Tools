package tc.bank.asda.warning.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 日志预警事件模板
 * @author parry
 *
 */
@Table(name = "aiml_cfg_log_event_model")
public class AimlCfgLogEventModel {

	@Column(name = "id")
	private long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "content")
	private String content;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
