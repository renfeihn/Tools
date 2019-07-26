package tc.cama.aweb.ab.service;

import java.util.List;

import tc.cama.aweb.ab.model.AimAbcListCur;

public interface IAbcInfoManager {

	/**
	 * 全部的多ABC列表信息查询
	 * @return
	 */
	List<AimAbcListCur> getAbcList();


	/**
	 * 指定实例对应的多ABC列表信息查询	
	 * @param mobjId
	 * @return
	 */
	List<AimAbcListCur> getAbcListByMobjId(Integer mobjId);


	/**
	 * 单ABC信息查询
	 * @param mobjId
	 * @param oid
	 * @return
	 */
	List<AimAbcListCur> getAbcListByOId(Integer mobjId, String oid);

	/**
	 * 
	 * @return
	 */
	Integer getCountTellerno();

	/**
	 * 
	 * @return
	 */
	Integer getCountAbcIp();

}