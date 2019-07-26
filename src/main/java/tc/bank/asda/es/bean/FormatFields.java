package tc.bank.asda.es.bean;

import java.io.Serializable;

public class FormatFields implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7032215595750806378L;

	/**
	 * 结构化字段名
	 */
	private String fieldName;
	
	/**
	 * 结构化字段值
	 */
	private Object fieldValue;

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public Object getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(Object fieldValue) {
		this.fieldValue = fieldValue;
	}

	public FormatFields(String fieldName, Object fieldValue) {
		super();
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}

	public FormatFields() {
		super();
	}
	
}
