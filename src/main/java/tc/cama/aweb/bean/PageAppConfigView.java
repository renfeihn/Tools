package tc.cama.aweb.bean;

import java.util.List;

import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;
import tc.bank.cama.cmdb.model.table.CmdbObjectSummary;
import tc.bank.cama.cmdb.model.table.extention.CmdbApplication;
import tc.bank.cama.cmdb.model.view.CmdbObjectCategoryCount;
/**
 * 应用配置总览bean
 * @author zhangkun
 *
 */
public class PageAppConfigView {
	/**
	 * 全部分类
	 */
	private List<CmdbObjectCategory> allCategories;
	/**
	 * 对象详情
	 */
	private Object objectDetail;
	/**一级分类下的对象信息
	 * 
	 */
	private List<CmdbObjectSummary> firstCategoryObjects;
	/**
	 * 二级分类下的对象信息
	 */
	List<CmdbObjectSummary> secondCategoryObjects;
	/**
	 * 三级分类下的对象信息
	 */
	List<CmdbObjectSummary> thirdCategoryObjects;
	/**
	 * 对象健康度
	 */
	List<Object[][]> healthValue;
	/**
	 * 对象收藏状态
	 */
	List<Object[][]> focusTaget;
	/**
	 * 对象关联的应用系统信息
	 */
	List<CmdbApplication> objectRelatedApps;
	/**
	 * 软件关联的进程、端口数
	 */
	List<Long> softwareProcessAndPortCount;
	/**
	 * 逻辑服务器关联的应用系统
	 */
	List<CmdbApplication> logicServerRelatedApps;
	/**
	 * 查询逻辑服务器关联软件的二级分类和数量
	 */
	List<CmdbObjectCategoryCount> secondCategorySoftwareCount;
	public List<CmdbObjectCategory> getAllCategories() {
		return allCategories;
	}
	public void setAllCategories(List<CmdbObjectCategory> allCategories) {
		this.allCategories = allCategories;
	}
	public Object getObjectDetail() {
		return objectDetail;
	}
	public void setObjectDetail(Object objectDetail) {
		this.objectDetail = objectDetail;
	}
	public List<CmdbObjectSummary> getFirstCategoryObjects() {
		return firstCategoryObjects;
	}
	public void setFirstCategoryObjects(List<CmdbObjectSummary> firstCategoryObjects) {
		this.firstCategoryObjects = firstCategoryObjects;
	}
	public List<CmdbObjectSummary> getSecondCategoryObjects() {
		return secondCategoryObjects;
	}
	public void setSecondCategoryObjects(List<CmdbObjectSummary> secondCategoryObjects) {
		this.secondCategoryObjects = secondCategoryObjects;
	}
	public List<CmdbObjectSummary> getThirdCategoryObjects() {
		return thirdCategoryObjects;
	}
	public void setThirdCategoryObjects(List<CmdbObjectSummary> thirdCategoryObjects) {
		this.thirdCategoryObjects = thirdCategoryObjects;
	}
	public List<Object[][]> getHealthValue() {
		return healthValue;
	}
	public void setHealthValue(List<Object[][]> healthValue) {
		this.healthValue = healthValue;
	}
	public List<Object[][]> getFocusTaget() {
		return focusTaget;
	}
	public void setFocusTaget(List<Object[][]> focusTaget) {
		this.focusTaget = focusTaget;
	}
	public List<CmdbApplication> getObjectRelatedApps() {
		return objectRelatedApps;
	}
	public void setObjectRelatedApps(List<CmdbApplication> objectRelatedApps) {
		this.objectRelatedApps = objectRelatedApps;
	}
	public List<Long> getSoftwareProcessAndPortCount() {
		return softwareProcessAndPortCount;
	}
	public void setSoftwareProcessAndPortCount(List<Long> softwareProcessAndPortCount) {
		this.softwareProcessAndPortCount = softwareProcessAndPortCount;
	}
	public List<CmdbApplication> getLogicServerRelatedApps() {
		return logicServerRelatedApps;
	}
	public void setLogicServerRelatedApps(List<CmdbApplication> logicServerRelatedApps) {
		this.logicServerRelatedApps = logicServerRelatedApps;
	}
	public List<CmdbObjectCategoryCount> getSecondCategorySoftwareCount() {
		return secondCategorySoftwareCount;
	}
	public void setSecondCategorySoftwareCount(List<CmdbObjectCategoryCount> secondCategorySoftwareCount) {
		this.secondCategorySoftwareCount = secondCategorySoftwareCount;
	}
	

}
