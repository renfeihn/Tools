package tc.bank.cama.core.bean;

import java.io.Serializable;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import tc.bank.common.lang.StringUtils;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONObject;
import com.aim.alibaba.fastjson.annotation.JSONField;

public class MetricVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1647949421864674912L;
	/**
	 * 对象ID
	 */
	private int objId;
	/**
	 * 指标ID
	 */
	private int id;
	/**
	 * 指标名称
	 */
	private String name;
	/**
	 * 指标中文名称
	 */
	private String displayName;

	/**
	 * 时间
	 */
	private Date time;

	/**
	 * 指标值
	 */
	private String value;
	/**
	 * 单位
	 */
	private String unit;

	/**
	 * 标签 jsonObject字符串
	 */
	private String tagkvs;

	/**
	 * @return 对象ID
	 */
	public int getObjId() {
		return objId;
	}

	/**
	 * @param objId
	 *            对象ID
	 */
	public void setObjId(int objId) {
		this.objId = objId;
	}

	/**
	 * @return 指标ID
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id
	 *            指标ID
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return 指标名称
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            指标名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 指标中文名称
	 */
	public String getDisplayName() {
		return displayName;
	}

	/**
	 * @param displayName
	 *            指标中文名称
	 */
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	/**
	 * @return 时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	public Date getTime() {
		return time;
	}

	/**
	 * @param time
	 *            时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	public void setTime(Date time) {
		this.time = time;
	}

	/**
	 * @return 指标值
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @param value
	 *            指标值
	 */
	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * @return 单位
	 */
	public String getUnit() {
		return unit;
	}

	/**
	 * @param unit
	 *            单位
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}

	/**
	 * @return 标签 jsonObject字符串
	 */
	public String getTagkvs() {
		return tagkvs;
	}

	/**
	 * @param tagkvs
	 *            标签 jsonObject字符串
	 */
	public void setTagkvs(String tagkvs) {
		this.tagkvs = tagkvs;
	}

	public Map<String, String> tags() {
		if (tagkvs == null || tagkvs.isEmpty()) {
			return Collections.emptyMap();
		}
		Map<String, String> map = new HashMap<String, String>();
		JSONObject jo = JSON.parseObject(tagkvs);
		for (String key : jo.keySet()) {
			map.put(key, jo.getString(key));
		}
		return map;
	}

	public String tagvs() {
		Map<String, String> tags = tags();
		if (tags == null || tags.isEmpty()) {
			return null;
		}
		return StringUtils.join(tags.values(), ".");
	}

}
