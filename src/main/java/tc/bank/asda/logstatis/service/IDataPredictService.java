package tc.bank.asda.logstatis.service;

import java.util.Date;

import tc.bank.common.core.Timeline;

public interface IDataPredictService {

	/**预测数据
	 * @param objId
	 * @param metric
	 * @param start
	 * @param end
	 * @return
	 */
	Timeline<Double> predict(int objId,String metric, Date start, Date end);
}
