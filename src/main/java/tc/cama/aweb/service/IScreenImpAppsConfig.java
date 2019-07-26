package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.esb.model.EsbShowSystem;

public interface IScreenImpAppsConfig {
	/**
	 * 获取重要系统列表
	 * @return
	 */
	public List<EsbShowSystem> getImpAppsList();
	
	/**
	 * 根据sysCode获取一条重要系统信息
	 * @param code
	 * @return
	 */
	public EsbShowSystem getImpApp(String sysCode);
	
	/**
	 * 新增一条重要系统信息
	 * @return
	 */
	public String insertImpApp(EsbShowSystem impApp);
	
	/**
	 * 根据sysCode修改
	 * @return
	 */
	public String updateImpApp(EsbShowSystem impApp,String sysCode);
	
	/**
	 * 根据sysCode删除
	 * @return
	 */
	public String deleteImpApp(String sysCode);
}
