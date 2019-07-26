package cn.com.agree.aweb.struts2.action.asda;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.service.aweb.ILoginService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.report.model.DashBoardReport;
import tc.bank.asda.report.model.DashBoardReportEXE;
import tc.bank.asda.report.model.DashBoardReportRelation;
import tc.bank.asda.report.service.IDashBoardReportService;
import tc.cama.aweb.model.AwebUser;

/**
 * Created by wangch on 2018/9/17.
 */
@Controller("ESReportAction")
@Scope("prototype")
public class ESReportAction extends StandardActionSupport {

    private static final long serialVersionUID = -3421375543428644265L;
    
    @Autowired
    private IDashBoardReportService reportService;
    
    @Autowired
	private ILoginService loginServer;
    
    /* 接受参数 */
    private String jsonObject;
    /*页码*/
    private Integer page;
    /*页面大小*/
    private Integer pageSize;
    /*报表ID*/
    private Long reportId;

    public String getJsonObject() {
        return jsonObject;
    }

    public void setJsonObject(String jsonObject) {
        this.jsonObject = jsonObject;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Long getReportId() {
		return reportId;
	}

	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}

	/**
     * 查询所有报表配置数据
     * @return
     */
    public String getAllReport() {
        try {
        		List<DashBoardReport> reports = reportService.getAllReport();
        		for(DashBoardReport tmp : reports) {
        			AwebUser user = loginServer.getUserById(tmp.getUserId());
        			if(null != user) {
        				tmp.setUsername(user.getUsername());
        			}
        		}
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reports));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    public String getReportStatisticCount(){
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.statisticReportConfig()));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 添加一条统计配置
     * @return
     */
    public String addReport(){
        try{
	        	DashBoardReport report = JSONObject.parseObject(jsonObject,DashBoardReport.class);
	        	report.setUserId(this.getUserVO().getId());
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.addReport(report)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 修改一条统计配置
     * @return
     */
    public String editReport(){
        try{
	        	DashBoardReport report = JSONObject.parseObject(jsonObject,DashBoardReport.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.updateReport(report)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 删除一条统计配置
     * @return
     */
    public String deleteReport(){
        try{
	        	DashBoardReport report = JSONObject.parseObject(jsonObject,DashBoardReport.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.delReportById(report.getReportId())));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }


    /**
     * 获取统计结果
     * @return
     */
    public String getReportEXE() {
        try {
	        	DashBoardReportEXE reportEXE = JSONObject.parseObject(jsonObject,DashBoardReportEXE.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.getAllReportEXE(reportEXE)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 增加统计数据
     * @return
     */
    public String addReportEXE() {
        try {
	        	DashBoardReportEXE reportEXE = JSONObject.parseObject(jsonObject,DashBoardReportEXE.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.addReportEXE(reportEXE)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 修改
     * @return
     */
    public String editReportEXE() {
        try {
	        	DashBoardReportEXE reportEXE = JSONObject.parseObject(jsonObject,DashBoardReportEXE.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.updateReportEXE(reportEXE)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 删除
     * @return
     */
    public String deleteReportEXE() {
        try {
	        	DashBoardReportEXE reportEXE = JSONObject.parseObject(jsonObject,DashBoardReportEXE.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.delReportEXEById(reportEXE.getId())));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }


    /**
     * 获取报表关系
     * @return
     */
    public String getReportRelationByReportId() {
        try {
	        	DashBoardReportRelation relation = JSONObject.parseObject(jsonObject,DashBoardReportRelation.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.getReportRelationById(relation.getReportId())));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 新建报表关系
     * @return
     */
    public String addReportRelation() {
        try {
	        	List<DashBoardReportRelation> relations = JSONObject.parseArray(jsonObject,DashBoardReportRelation.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.addReportRelation(relations)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    public String deleReportRelation(){
        try {
	        	DashBoardReportRelation relation = JSONObject.parseObject(jsonObject,DashBoardReportRelation.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.delReportRelationById(relation.getReportId())));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }
    /**
     * 复制报表
     * @return
     */
    public String copyReport(){
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reportService.copyReport(reportId,getUserVO().getId())));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }
}
