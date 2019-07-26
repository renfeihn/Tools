package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.word.service.IWordService;

@Controller("WordActionBean")
@Scope("prototype")
public class WordAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8316376328428644265L;

	@Autowired
	private IWordService wordService;

	private String module;

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	/**
	 * 获取SPL及SQL关键字提示,module可选
	 * 
	 * @return
	 */
	public String getWord() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", wordService.getWord(module)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查询结构化字段
	 * 
	 * @return
	 */
	public String getStructWords() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					wordService.getStructWords(this.getUserName())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

}
