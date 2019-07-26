package tc.bank.asda.logconfig.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_split_method_param")
public class AimlSplitMethodParam implements Comparable<AimlSplitMethodParam> {

	/**
	 * 方法ID
	 */
	@Column(name = "method_id")
	private long methodId;
	/**
	 * 参数名
	 */
	@Column(name = "param_name")
	private String paramName;
	/**
	 * 参数描述
	 */
	@Column(name = "param_des")
	private String paramDes;
	/**
	 * 字段类型 1 String 2 int 3 chart 4 data 5 long 7 byte
	 */
	@Column(name = "param_type")
	private String paramType;
	/**
	 * 1 出参 2 入参
	 */
	@Column(name = "is_out_param")
	private int isOutParam;
	/**
	 * 入参顺序1～n
	 */
	@Column(name = "param_order")
	private int paramOrder;

	public long getMethodId() {
		return methodId;
	}

	public void setMethodId(long methodId) {
		this.methodId = methodId;
	}

	public String getParamName() {
		return paramName;
	}

	public void setParamName(String paramName) {
		this.paramName = paramName;
	}

	public String getParamDes() {
		return paramDes;
	}

	public void setParamDes(String paramDes) {
		this.paramDes = paramDes;
	}

	public String getParamType() {
		return paramType;
	}

	public void setParamType(String paramType) {
		this.paramType = paramType;
	}

	public int getIsOutParam() {
		return isOutParam;
	}

	public void setIsOutParam(int isOutParam) {
		this.isOutParam = isOutParam;
	}

	public int getParamOrder() {
		return paramOrder;
	}

	public void setParamOrder(int paramOrder) {
		this.paramOrder = paramOrder;
	}

	@Override
	public int compareTo(AimlSplitMethodParam arg0) {
		if (this.paramOrder > arg0.getParamOrder()) {
			return 1;
		} else {
			return -1;
		}
	}
}
