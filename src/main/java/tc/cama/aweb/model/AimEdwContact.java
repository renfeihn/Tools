package tc.cama.aweb.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "aim_edw_contact")
public class AimEdwContact implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 记录ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 手机号码
	 */
	@Column(name = "contact_phone")
	private String contactPhone;
	/**
	 * 人员姓名
	 */
	@Column(name = "contact_name")
	private String contactName;
	/**
	 * 备注
	 */
	@Column(name = "note")
	private String note;

	/**
	 * @return 记录ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            记录ID
	 */
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return 手机号码
	 */
	public String getContactPhone() {
		return this.contactPhone;
	}

	/**
	 * @param contactPhone
	 *            手机号码
	 */
	@Column(name = "contact_phone")
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	/**
	 * @return 人员姓名
	 */
	public String getContactName() {
		return this.contactName;
	}

	/**
	 * @param contactName
	 *            人员姓名
	 */
	@Column(name = "contact_name")
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	/**
	 * @return 备注
	 */
	public String getNote() {
		return this.note;
	}

	/**
	 * @param note
	 *            备注
	 */
	@Column(name = "note")
	public void setNote(String note) {
		this.note = note;
	}

}

