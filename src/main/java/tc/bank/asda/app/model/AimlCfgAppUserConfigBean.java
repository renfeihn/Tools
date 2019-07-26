package tc.bank.asda.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_app_user_config")
public class AimlCfgAppUserConfigBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9146494169144429781L;
	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 应用系统主键
	 */
	@Column(name = "source_id")
	private long sourceId;
	/**
	 * 用户主键
	 */
	@Column(name = "user_id")
	private long userId;
	/**
	 * 自定义超时凸显颜色、表达式配置json
	 */
	@Column(name = "color_express_config")
	private String colorExpressConfig;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getSourceId() {
		return sourceId;
	}
	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getColorExpressConfig() {
		return colorExpressConfig;
	}
	public void setColorExpressConfig(String colorExpressConfig) {
		this.colorExpressConfig = colorExpressConfig;
	}
}
