package tc.bank.asda.logtrace.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_trankeys_stopword")
public class AimlCfgTrankeysStopword implements Serializable {
  /**
   * 
   */
  private static final long serialVersionUID = -5355921296863790466L;
  @Id
  @SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
  @Column(name = "id")
  private Integer id;
  /**
   * 0-字符串 1-正则
   */
  @Column(name = "type")
  private Integer type;
  /**
   * 停止词
   */
  @Column(name = "stopword")
  private String stopword;
  /**
   * 上下文
   */
  @Column(name = "context")
  private String context;
  /**
   * 0-配置;1-智能分析
   */
  @Column(name = "source")
  private Integer source;
  /**
   * 说明
   */
  @Column(name = "note")
  private String note;

  /**
   * @return id
   */
  public Integer getId() {
    return this.id;
  }

  /**
   * @param id
   *          id
   */
  @Column(name = "id")
  public void setId(Integer id) {
    this.id = id;
  }

  /**
   * @return 0-字符串 1-正则
   */
  public Integer getType() {
    return this.type;
  }

  /**
   * @param type
   *          0-字符串 1-正则
   */
  @Column(name = "type")
  public void setType(Integer type) {
    this.type = type;
  }

  /**
   * @return 停止词
   */
  public String getStopword() {
    return this.stopword;
  }

  /**
   * @param stopword
   *          停止词
   */
  @Column(name = "stopword")
  public void setStopword(String stopword) {
    this.stopword = stopword;
  }

  /**
   * @return 上下文
   */
  public String getContext() {
    return this.context;
  }

  /**
   * @param context
   *          上下文
   */
  @Column(name = "context")
  public void setContext(String context) {
    this.context = context;
  }

  /**
   * @return 0-配置;1-智能分析
   */
  public Integer getSource() {
    return this.source;
  }

  /**
   * @param source
   *          0-配置;1-智能分析
   */
  @Column(name = "source")
  public void setSource(Integer source) {
    this.source = source;
  }

  /**
   * @return 说明
   */
  public String getNote() {
    return this.note;
  }

  /**
   * @param note
   *          说明
   */
  @Column(name = "note")
  public void setNote(String note) {
    this.note = note;
  }

}