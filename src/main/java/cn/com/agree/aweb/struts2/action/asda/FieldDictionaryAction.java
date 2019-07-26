package cn.com.agree.aweb.struts2.action.asda;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.model.AimlCfgLogField;
import tc.bank.asda.logconfig.service.IAimlCfgLogFieldService;

@Controller("FieldDictionaryBean")
@Scope("prototype")
public class FieldDictionaryAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 387910770732961554L;
	
	@Autowired
	private IAimlCfgLogFieldService fieldService;

	private int id;
	
	private String fieldName;
	
	private String fieldDesc;
	
	private String fieldType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldDesc() {
		return fieldDesc;
	}

	public void setFieldDesc(String fieldDesc) {
		this.fieldDesc = fieldDesc;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}
	
	public String getAll() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", fieldService.getAllField()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String updateField() {
		try {
			if(StringUtils.isAnyEmpty(fieldDesc,fieldName,fieldType) || id==0) {
				setStrutsMessage(StrutsMessage.errorMessage("请输入完整的参数"));
				return ERROR;
			}
			AimlCfgLogField field = new AimlCfgLogField();
			field.setFieldDesc(fieldDesc);
			field.setFieldName(fieldName);
			field.setFieldType(fieldType);
			field.setId(id);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", fieldService.updateField(field)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String addField() {
		try {
			if(StringUtils.isAnyEmpty(fieldDesc,fieldName,fieldType)) {
				setStrutsMessage(StrutsMessage.errorMessage("请输入完整的参数"));
				return ERROR;
			}
			AimlCfgLogField field = new AimlCfgLogField();
			field.setFieldDesc(fieldDesc);
			field.setFieldName(fieldName);
			field.setFieldType(fieldType);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", fieldService.addField(field)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String delField() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", fieldService.delField(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
