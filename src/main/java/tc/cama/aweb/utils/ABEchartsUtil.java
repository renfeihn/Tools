package tc.cama.aweb.utils;

import java.util.List;
import java.util.Map;

public interface  ABEchartsUtil {
	/**
	 * 获取ab中某些字段的echarts
	 * @param clazz
	 * @param pros条件
	 * @param mercts需要显示的字段
	 * @param timeBlock时间区间(分钟)
	 * @param inteval时间间隔(分钟)
	 * @return
	 * @throws Exception 
	 */
   Map<String,List<String>> getEchartsData(Class<?> clazz,Map<String,String> pros,List<String> mercts,int timeBlock,int inteval) throws Exception;
}
