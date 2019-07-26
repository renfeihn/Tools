package tc.bank.asda.es.bean;

import java.io.File;
import java.util.List;
/**
 * 邮件对象
 * @author yangkuanjun
 *
 */
public class Mail {

	/**
	 * 发件人
	 */
	private String from;
	/**
	 * 主题
	 */
	private String subject;
	/**
	 * 正文
	 */
	private String content;
	/**
	 * 收件人
	 */
	private List<String> receive;
	/**
	 * 抄送人
	 */
	private List<String> cc;
	/**
	 *  时候带附件
	 */
	private boolean attach;
	/**
	 * 附件
	 */
	private File file;
	/**
	 * 图片路径
	 */
	private String imagePath;

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<String> getReceive() {
		return receive;
	}

	public void setReceive(List<String> receive) {
		this.receive = receive;
	}

	public List<String> getCc() {
		return cc;
	}

	public void setCc(List<String> cc) {
		this.cc = cc;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public boolean isAttach() {
		return attach;
	}

	public void setAttach(boolean attach) {
		this.attach = attach;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
}
