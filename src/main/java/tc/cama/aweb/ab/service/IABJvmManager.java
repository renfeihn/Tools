package tc.cama.aweb.ab.service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.core.service.metric.MetricConstants;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.ab.model.AimAbsOsinfoCur;
import tc.cama.aweb.bean.HeapBeanApm;
import tc.cama.aweb.bean.JvmBean;
import tc.cama.aweb.bean.MemAnsyBean;

public interface IABJvmManager {
	/**
	 * 获取jvm的堆内存使用 jvm内存使用 物理内存使用 
	 * @param objIds
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
   Timeline<Double> getJVMEcharts(int objId, String[] metricNames,
			Map<String, String> tagkvs, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);
   /**
    * jvm信息
    * @param objId
    * @return
    */
   JvmBean getJvmBean(int objId);
   /**
    * 获取单abs下的heap内存信息
    * @param objId
    * @return
    */
   HeapBeanApm getHeapBeanApm(int objId);
   /**
    * 根据ip查询操作系统信息
    * @param ip
    * @return
    */
   AimAbsOsinfoCur getOsCur(String ip);
   /**
    * 内存分析
    * @param objId
    * @return
    */
   MemAnsyBean getDynameic(int objId,String ip );
   /**
    * 堆内存分配和使用情况
    * @param absname
    * @return
    */
   public String getJVMInfo(String absname);
}
