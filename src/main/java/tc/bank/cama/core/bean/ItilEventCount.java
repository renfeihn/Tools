package tc.bank.cama.core.bean;

import java.io.Serializable;

import tc.bank.cama.cmdb.service.CmdbConstants;

public class ItilEventCount implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3084621059231731221L;
	/**
	 * 对象分类
	 */
	private CmdbConstants.Category category;

	/**
	 * 应用系统ID
	 */
	private int appId;

	/**
	 * 应用系统名称
	 */
	private String appName;

	/**
	 * 健康度
	 */
	private int healtyDegree = 100;
	/**
	 * 待分派
	 */
	private int pending;
	/**
	 * 已分派
	 */
	private int assigned;
	/**
	 * 处理中
	 */
	private int inProgress;
	/**
	 * 已解决
	 */
	private int resolved;
	/**
	 * 已关闭
	 */
	private int closed;
	/**
	 * 已取消
	 */
	private int cancelled;
	/**
	 * 长时间未受理
	 */
	private int dealLongtime;
	/**
	 * 长时间未解决
	 */
	private int dealingLongtime;
	/**
	 * 处理率[0,100]
	 */
	private int dealtPercentage;
	/**
	 * 未解除数
	 */
	private int dealing;

	/**
	 * 已解除
	 */
	private int dealt;

	/**
	 * @return 对象分类
	 */
	public CmdbConstants.Category getCategory() {
		return category;
	}

	/**
	 * @param category
	 *            对象分类
	 */
	public void setCategory(CmdbConstants.Category category) {
		this.category = category;
	}

	/**
	 * @return 应用系统ID
	 */
	public int getAppId() {
		return appId;
	}

	/**
	 * @param appId
	 *            应用系统ID
	 * 
	 */
	public void setAppId(int appId) {
		this.appId = appId;
	}

	/**
	 * @return 应用系统名称
	 */
	public String getAppName() {
		return appName;
	}

	/**
	 * @param appName
	 *            应用系统名称
	 */
	public void setAppName(String appName) {
		this.appName = appName;
	}

	/**
	 * @return 健康度
	 */
	public int getHealtyDegree() {
		return healtyDegree;
	}

	/**
	 * @param healtyDegree
	 *            健康度
	 */
	public void setHealtyDegree(int healtyDegree) {
		this.healtyDegree = healtyDegree;
	}

	/**
	 * @return 待分派
	 */
	public int getPending() {
		return pending;
	}

	/**
	 * @param pending
	 *            待分派
	 */
	public void setPending(int pending) {
		this.pending = pending;
	}

	/**
	 * @return 已分派
	 */
	public int getAssigned() {
		return assigned;
	}

	/**
	 * @param assigned
	 *            已分派
	 */
	public void setAssigned(int assigned) {
		this.assigned = assigned;
	}

	/**
	 * @return 处理中
	 */
	public int getInProgress() {
		return inProgress;
	}

	/**
	 * @param inProgress
	 *            处理中
	 */
	public void setInProgress(int inProgress) {
		this.inProgress = inProgress;
	}

	/**
	 * @return 已解决
	 */
	public int getResolved() {
		return resolved;
	}

	/**
	 * @param resolved
	 *            已解决
	 */
	public void setResolved(int resolved) {
		this.resolved = resolved;
	}

	/**
	 * @return 已关闭
	 */
	public int getClosed() {
		return closed;
	}

	/**
	 * @param closed
	 *            已关闭
	 */
	public void setClosed(int closed) {
		this.closed = closed;
	}

	/**
	 * @return 已取消
	 */
	public int getCancelled() {
		return cancelled;
	}

	/**
	 * @param cancelled
	 *            已取消
	 */
	public void setCancelled(int cancelled) {
		this.cancelled = cancelled;
	}

	/**
	 * @return 长时间未受理
	 */
	public int getDealLongtime() {
		return dealLongtime;
	}

	/**
	 * @param dealLongtime
	 *            长时间未受理
	 */
	public void setDealLongtime(int dealLongtime) {
		this.dealLongtime = dealLongtime;
	}

	/**
	 * @return 长时间未解决
	 */
	public int getDealingLongtime() {
		return dealingLongtime;
	}

	/**
	 * @param dealingLongtime
	 *            长时间未解决
	 */
	public void setDealingLongtime(int dealingLongtime) {
		this.dealingLongtime = dealingLongtime;
	}

	/**
	 * @return 处理率[0,100]
	 */
	public int getDealtPercentage() {
		return dealtPercentage;
	}

	/**
	 * @param dealtPercentage
	 *            处理率[0,100]
	 */
	public void setDealtPercentage(int dealtPercentage) {
		this.dealtPercentage = dealtPercentage;
	}

	/**
	 * @return 未解除数
	 */
	public int getDealing() {
		return dealing;
	}

	/**
	 * @param dealing
	 *            未解除数
	 */
	public void setDealing(int dealing) {
		this.dealing = dealing;
	}

	/**
	 * @return 已解除
	 */
	public int getDealt() {
		return dealt;
	}

	/**
	 * @param dealt
	 *            已解除
	 */
	public void setDealt(int dealt) {
		this.dealt = dealt;
	}

}
