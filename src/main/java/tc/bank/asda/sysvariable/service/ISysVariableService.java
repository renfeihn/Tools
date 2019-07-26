package tc.bank.asda.sysvariable.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.core.module.AimSysconfigVariables;

import com.aim.alibaba.fastjson.JSONArray;

/**
 * 系统参数管理
 * 
 * @author parry
 * 
 */
public interface ISysVariableService {

	/**
	 * 修改系统参数值和参数说明
	 * 
	 * @param id
	 * @param val
	 * @param valDesc
	 * @return
	 */
	boolean updateSysVariable(Integer id, String val, String valDesc);

	/**
	 * 查询所有的系统参数
	 * 
	 * @return
	 */
	JSONArray getAllSysVariable();

	/**
	 * 根据类别查询系统参数
	 * 
	 * @param category
	 * @return
	 */
	Map<String, String> getProperties(String category);

	/**
	 * 根据条件查询系统参数
	 * 
	 * @param whereEx
	 * @return
	 */
	List<AimSysconfigVariables> getSysVariableByCon(Map<String, Object> whereEx)
			throws Exception;

	/**
	 * 新增一条
	 * 
	 * @param bean
	 * @return
	 * @throws Exception
	 */
	boolean addSysVariable(AimSysconfigVariables bean) throws Exception;
}
