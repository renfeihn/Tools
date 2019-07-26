package tc.bank.asda.report.service;

import tc.bank.asda.report.model.DashBoardReport;
import tc.bank.asda.report.model.DashBoardReportEXE;
import tc.bank.asda.report.model.DashBoardReportRelation;
import tc.bank.asda.report.model.Report;

import java.util.List;
import java.util.Map;

/**
 * Created by wangch on 2018/9/15.
 */
public interface IDashBoardReportService {


    /**
     * 判断当前时间，需要执行的配置记录，和统计时间
     * @return
     */
    Map<Long, Report> getConfigForExecute();

    /**
     * 根据条件执行统计，并保存入库
     * @return
     */
    boolean executeStatistcs();

    /**
     * 添加一条仪表盘统计报表
     * @param dashBoard
     * @return
     */
    boolean addReport(DashBoardReport dashBoard);

    /**
     * 获取全部仪表盘统计报表
     * @param
     * @return
     */
    List<DashBoardReport> getAllReport();

    /**
     * 统计每个报表的历史统计数据
     * @return
     */
    List<Map<String,Object>> statisticReportConfig();

    /**
     * 根据ID获取仪表盘报表
     * @param id 主键ID
     * @return
     */
    DashBoardReport getReportById(long id);
    /**
     * 根据ID删除仪表盘报表
     * @param id 主键ID
     * @return
     * @throws Exception
     */
    boolean delReportById(long id) throws Exception;
    /**
     * 修改仪表盘报表
     * @param dashBoard
     * @return
     */
    boolean updateReport(DashBoardReport dashBoard);

    /**
     * 添加一条统计结果数据
     * @param dashBoard
     * @return
     */
    boolean addReportEXE(DashBoardReportEXE dashBoard);

    /**
     * 获取统计结果数据
     * @param
     * @return
     */
    List<DashBoardReportEXE> getAllReportEXE(DashBoardReportEXE dashBoard);

    /**
     * 根据ID获取统计结果数据
     * @param id 主键ID
     * @return
     */
    DashBoardReportEXE getReportEXEById(long id);
    /**
     * 根据ID删除统计结果数据
     * @param id 主键ID
     * @return
     * @throws Exception
     */
    boolean delReportEXEById(long id) throws Exception;
    /**
     * 修改仪统计结果数据
     * @param dashBoard
     * @return
     */
    boolean updateReportEXE(DashBoardReportEXE dashBoard);

    /**
     * 添加一条报表关联关系
     * @param relations
     * @return
     */
    int addReportRelation(List<DashBoardReportRelation> relations);

    /**
     * 获取报表关联关系列表
     * @param
     * @return
     */
    List<DashBoardReportRelation> getAllReportRelation();

    /**
     * 根据ID获取报表关联关系信息
     * @param id 主键ID
     * @return
     */
    List<Report> getReportRelationById(long id);
    /**
     * 根据ID删除报表关联关系
     * @param id 主键ID
     * @return
     * @throws Exception
     */
    boolean delReportRelationById(long id) throws Exception;
    /**
     * 复制报表
     * @param reportId
     * @param userId
     * @return
     */
	boolean copyReport(long reportId,Integer userId);

}
