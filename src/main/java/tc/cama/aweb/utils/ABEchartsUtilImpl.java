package tc.cama.aweb.utils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.common.db.IDbService;
import tc.bank.common.db.Sort;

public class ABEchartsUtilImpl implements ABEchartsUtil{
    private IDbService dbService;
    
	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	@Override
	public Map<String, List<String>> getEchartsData(Class<?> clazz, Map<String, String> pros, List<String> mercts,
			int timeBlock, int inteval) throws Exception{
		JSONObject whereEx = new JSONObject();
		for(String key:pros.keySet()){
			whereEx.put(key, pros.get(key));
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
		String recordTime = sdf.format(new Date());
		whereEx.put("srvServerDate", recordTime);
		List<String> prop = new ArrayList<String>();
		prop.add("recordTime");
		Sort sort = new Sort("ASC", prop);
		List<?> list = dbService.queryAsBeanList(clazz, whereEx, sort);
		List<Map<String, List<String>>> echartsData = new ArrayList<Map<String, List<String>>>();
		Map<String,List<String>> echar=new HashMap<String,List<String>>();
		List<String> time = new ArrayList<String>();
		int i=1;
		for(String mer:mercts){
			List<String> line = new ArrayList<String>();
		
		            Object object=clazz.newInstance();
		            
		            Field field=clazz.getDeclaredField(mer);

		            Field field1=clazz.getDeclaredField("srvServerTime");
		            PropertyDescriptor pd = new PropertyDescriptor(field.getName(),
		    				clazz);
		            PropertyDescriptor pdTime = new PropertyDescriptor(field1.getName(),
		    				clazz);
		    		Method getMethod = pd.getReadMethod();
		    		Method getTimeMethod = pdTime.getReadMethod();
		    		// 反射取值
		    		
			for (Object rep : list) {
				if(time.size()<=list.size()){
			if(clazz.getDeclaredField("srvServerDate")!=null){
				String time1=String.valueOf(getTimeMethod.invoke(rep));
				time.add(time1);
			}else{
				time.add(sdf1.format(""));
			}
				}
				line.add(String.valueOf(getMethod.invoke(rep)));
				
			}
		echar.put("time1", time);
		echar.put("line"+i++, line);
		
		}
		
		
		
		return echar;

	}

}
