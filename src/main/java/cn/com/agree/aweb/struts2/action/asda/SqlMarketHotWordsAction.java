package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.sqlmarket.service.IAimSqlMarketHotWordsService;
import tc.bank.common.lang.StringUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("SqlMarketHotWordsActionBean")
@Scope("prototype")
public class SqlMarketHotWordsAction extends StandardActionSupport {

	private static final long serialVersionUID = -7697333304333548898L;
	
	@Autowired
	private IAimSqlMarketHotWordsService hotWordsService;
	
	private int userId;
	
	private int size;
	
	private String words;
	
	public String addWords() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(userId <= 0 || StringUtils.isEmpty(words)) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				hotWordsService.add(userId, words);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getHotWords() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(size <= 0) {
					size = 10;
				}
				setStrutsMessage(
						StrutsMessage.successMessage().addParameter("result", hotWordsService.getHotWords(size)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public String getWords() {
		return words;
	}

	public void setWords(String words) {
		this.words = words;
	}
	
}
