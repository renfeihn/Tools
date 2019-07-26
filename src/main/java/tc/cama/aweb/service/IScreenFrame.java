package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.ScreenEsbSystem;
import tc.cama.aweb.esb.model.EsbMonMS;

public interface IScreenFrame {
	
	/**
	 * 获取ESB应用系统数
	 * @return
	 * @throws Exception
	 */
	Long getEsbSystemCount() throws Exception;
	
	/**
	 * 获取ESB所有应用系统列表
	 * @return
	 * @throws Exception
	 */
	List<ScreenEsbSystem> getEsbSystemList() throws Exception;
	
	/**
	 * 按照ESB应用系统列表查询ESB性能数据
	 * @param sysCodeList
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getEsbDataByMonList(int monType,List<String> sysCodeList,int statisticType,int orderType,int top) throws Exception;
	
	/**
	 * 按照AS400日交易量
	 * @return
	 * @throws Exception
	 */
	Double getEsbTransCount() throws Exception;
}
