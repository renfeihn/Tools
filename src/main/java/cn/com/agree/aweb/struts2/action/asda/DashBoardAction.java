package cn.com.agree.aweb.struts2.action.asda;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.dashboard.model.DashBoard;
import tc.bank.asda.dashboard.model.DashBoardRelation;
import tc.bank.asda.dashboard.service.IDashBoardGroupService;
import tc.bank.asda.dashboard.service.IDashBoardService;
import tc.bank.common.date.DateUtils;
import tc.bank.common.lang.StringUtils;

@Controller("DashBoardActionBean")
@Scope("prototype")
public class DashBoardAction extends StandardActionSupport{

	private static final String Date_Format = "yyyy-MM-dd HH:mm:ss";
	/**
	 * 
	 */
	private static final long serialVersionUID = -8316376328428644265L;
	
	@Autowired
	private IDashBoardService dashBoardService;
	
	@Autowired
	private IDashBoardGroupService dashBoardGroupService;
	
	/**
	 * 主键ID
	 */
	private long id;
	/**
	 * 多个主键
	 */
	private List<Long> ids;
	/**
	 * 开始时间
	 */
	private String startTime;
	/**
	 * 结束时间
	 */
	private String endTime;
	/**
	 * 应用系统以及资产对象
	 */
	private String cate;
	/**
	 * 仪表盘名称
	 */
	private String name;
	/**
	 * 查询语句
	 */
	private String search;
	/**
	 * 统计JSON
	 */
	private String statistics;
	/**
	 * Echars图片 Base64
	 */
	private String image;
	/**
	 * 
	 * 时间保存类型 0:自动匹配 1:固定值
	 */
	private String timeType;
	/**
	 * 图标类型 1 折线图 2柱状图 3 饼图
	 */
	private int echartsType;
	/**
	 * 
	 * 时间间隔 单位s
	 */
	private long intervalTime;
	/**
	 * SQL语句
	 */
	private String sql;
	/**
	 * 仪表盘组ID
	 */
	private long groupId;
	/**
	 * 仪表盘组名
	 */
	private String groupName;
	/**
	 * 仪表盘组注释
	 */
	private String remark;
	/**
	 * 仪表盘关系
	 */
	private String relations;
	/**
	 * 统计数据来源 0-统计，1-SPL统计
	 */
	private int statisticsType;
	
	/**
	 * 选择字段
	 */
	private String fieldName;
	
	/**
	 * SQL
	 */
	private String sqlPhrases;

	public String getSqlPhrases() {
		return sqlPhrases;
	}

	public void setSqlPhrases(String sqlPhrases) {
		this.sqlPhrases = sqlPhrases;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getStatistics() {
		return statistics;
	}

	public void setStatistics(String statistics) {
		this.statistics = statistics;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getTimeType() {
		return timeType;
	}

	public void setTimeType(String timeType) {
		this.timeType = timeType;
	}

	public long getIntervalTime() {
		return intervalTime;
	}

	public void setIntervalTime(long intervalTime) {
		this.intervalTime = intervalTime;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public long getGroupId() {
		return groupId;
	}

	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRelations() {
		return relations;
	}

	public void setRelations(String relations) {
		this.relations = relations;
	}

	public List<Long> getIds() {
		return ids;
	}

	public void setIds(List<Long> ids) {
		this.ids = ids;
	}

	public int getEchartsType() {
		return echartsType;
	}

	public void setEchartsType(int echartsType) {
		this.echartsType = echartsType;
	}

	public int getStatisticsType() {
		return statisticsType;
	}

	public void setStatisticsType(int statisticsType) {
		this.statisticsType = statisticsType;
	}

	/**
	 * 查询全部的仪表盘信息 echartsType为0，获取全部
	 * @return
	 */
	public String getAllDashBoard() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardService.getAllDashBoard(echartsType)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 根据主键ID查询仪表盘信息
	 * @return
	 */
	public String getDashBoardById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardService.getDashBoardById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 根据主键ID删除仪表盘信息
	 * @return
	 */
	public String delDashBoardById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardService.delDashBoardById(id)));
			return SUCCESS;
		} catch (Exception e) {
			if(e.getMessage().contains("该仪表盘组件已被引用")) {
				setStrutsMessage(StrutsMessage.errorMessage("该仪表盘组件已被引用，无法删除！"));
			}else {
				setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			}
			return ERROR;
		}
	}
	
	/**
	 * 添加仪表盘信息
	 * @return
	 */
	public String addDashBoard() {
		try {
			DashBoard dashBoard = new DashBoard();
			dashBoard.setName(name);
			dashBoard.setImage(image);
			dashBoard.setSearch(search);
			dashBoard.setSqlPhrases(sql);
			dashBoard.setTimeType(timeType);
			dashBoard.setStatistics(statistics);
			dashBoard.setEchartsType(echartsType);
			dashBoard.setIntervalTime(intervalTime);
			dashBoard.setMustValue(cate);
			dashBoard.setStatisticsType(statisticsType);
			dashBoard.setSqlPhrases(sqlPhrases);
			dashBoard.setFieldName(fieldName);
			if(StringUtils.isNotEmpty(startTime)) {
				dashBoard.setStartTime(DateUtils.parse(startTime, Date_Format).getTime());
			}
			if(StringUtils.isNotEmpty(endTime)) {
				dashBoard.setEndTime(DateUtils.parse(endTime, Date_Format).getTime());
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardService.addDashBoard(dashBoard)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取单个仪表盘统计数据
	 * @return
	 */
	public String getDashBoardData() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardService.getDashBoardData(ids)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 修改仪表盘信息
	 * @return
	 */
	public String updateDashBoard() {
		try {
			DashBoard dashBoard = new DashBoard();
			dashBoard.setId(id);
			dashBoard.setName(name);
			dashBoard.setImage(image);
			dashBoard.setSearch(search);
			dashBoard.setMustValue(cate);
			dashBoard.setSqlPhrases(sql);
			dashBoard.setTimeType(timeType);
			dashBoard.setStatistics(statistics);
			dashBoard.setEchartsType(echartsType);
			dashBoard.setStatisticsType(statisticsType);
			dashBoard.setSqlPhrases(sqlPhrases);
			dashBoard.setIntervalTime(intervalTime);
			if(StringUtils.isNotEmpty(startTime)) {
				dashBoard.setStartTime(DateUtils.parse(startTime, Date_Format).getTime());
			}
			if(StringUtils.isNotEmpty(endTime)) {
				dashBoard.setEndTime(DateUtils.parse(endTime, Date_Format).getTime());
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardService.updateDashBoard(dashBoard)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 添加仪表盘信息
	 * @return
	 */
	public String addDashBoardGroup() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.addDashBoardGroup(groupName, remark)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取仪表盘列表
	 * @return
	 */
	public String getDashBoardGroups() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.getDashBoardGroups()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 修改仪表盘分组信息
	 * @return
	 */
	public String updateGroupName() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.updateDashBoardGroup(groupId, groupName, remark)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 拷贝仪表盘分组信息
	 * @return
	 */
	public String copyDashBoardGroup() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.copyDashBoardGroup(groupId, groupName, remark)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 删除仪表盘分组名称
	 * @return
	 */
	public String delGroupById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.delDashBoardGroupById(groupId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 保存仪表盘
	 * @return
	 */
	public String addDashBoardRelation() {
		try {
			JSONArray relationsArray = JSONArray.parseArray(relations);
			List<DashBoardRelation> list = new ArrayList<>();
			for(Object temp : relationsArray){
				JSONObject json = (JSONObject) temp;
				DashBoardRelation relation = new DashBoardRelation();
				relation.setX(json.getString("x"));
				relation.setY(json.getString("y"));
				relation.setWidth(json.getString("width"));
				relation.setHeight(json.getString("height"));
				relation.setBoardId(json.getLongValue("boardId"));
				list.add(relation);
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.addDashBoardRelation(groupId,list)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 根据groupId查询仪表盘内容
	 * @return
	 */
	public String getDashBoardByGroupId() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.getDashBoardByGroupId(groupId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 设置首页仪表盘
	 * @return
	 */
	public String setIndexDashBoardGroup() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.setIndexDashBoardGroup(groupId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 查询首页仪表盘内容
	 * @return
	 */
	public String getIndexDashBoard() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.getIndexDashBoard()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 *  仪表盘信息汇总
	 * @return
	 */
	public String getDashBoard() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dashBoardGroupService.getDashBoard()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
}
