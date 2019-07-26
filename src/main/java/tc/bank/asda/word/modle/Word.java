package tc.bank.asda.word.modle;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
/**
 * 关键字说明
 * @author parry
 *
 */
@Entity
@Table(name ="aiml_word")
public class Word {
	/**
	 * 模块
	 */
	@Column(name = "module")
	private String  module;
	
	/**
	 * 关键字
	 */
	@Column(name = "word")
	private String  word;
	
	/**
	 * 解释说明
	 */
	@Column(name = "explanation")
	private String  explanation;
	
	/**
	 * 使用例子
	 */
	@Column(name = "example")
	private String  example;

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getExplanation() {
		return explanation;
	}

	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}

	public String getExample() {
		return example;
	}

	public void setExample(String example) {
		this.example = example;
	}
}
