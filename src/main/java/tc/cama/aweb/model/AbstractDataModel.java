package tc.cama.aweb.model;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;

//import tc.bank.common.core.Logger;

/**
 * <li> Bean属性名使用Column注解修饰, name为SQL对应的字段名
 * <li> Bean属性名对应的setter方法按标准方式命名
 */
public abstract class AbstractDataModel implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * Column注解中的字段名与setter方法的映射
	 */
	private Map<String, Method> columnToMethod = new HashMap<String, Method>();
	
	/**
	 * @see {@link #columnToMethod}
	 * @throws Exception
	 */
	private void initColumnMethodMapping(Class<?> clazz) throws Exception {
		
		boolean hasException = true;
		
		try {
			
			if (this.columnToMethod.isEmpty()) {
				
				for (Field field: clazz.getDeclaredFields()) {
					
					Column column = field.getAnnotation(Column.class);
					
					if (null != column) {
						
						String fName = field.getName();
						String mName = "set" + fName.substring(0, 1).toUpperCase() + fName.substring(1);
						Method method = clazz.getDeclaredMethod(mName, field.getType());
						
						this.columnToMethod.put(column.name(), method);
					}
				}

			}
			
			hasException = false;
			
		} finally {
			
			if (hasException) {
				this.columnToMethod.clear();
			}
		}
	}

	private <T> Map<String, Method> getSelfColumnToMethod(Class<T> clazz) throws Exception {
		this.initColumnMethodMapping(clazz);
		return this.columnToMethod;
	}

	private static <T> Map<String, Method> getColumnToMethod(Class<T> clazz) throws Exception {
		T obj = clazz.getConstructor().newInstance();
		return ((AbstractDataModel) obj).getSelfColumnToMethod(clazz);
	}

	/**
	 * 将Map转换为类型是T的实例
	 * @param clazz
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public static final <T> T fromMap(Class<T> clazz, Map<String,Object> map) throws Exception {
		
		if (null == map) {
			return null;
		}

		T object = clazz.getConstructor().newInstance();
		
		Map<String,Method> columnToMethod = ((AbstractDataModel) object).getSelfColumnToMethod(clazz);

		for (String column : columnToMethod.keySet()) {
			
			Object value = map.get(column);
			
			if (map.containsKey(column)) {
				Method m = columnToMethod.get(column);
				m.invoke(object, value);
//				Logger.debug(String.format("<class:%s> <method:%s> <arg:%s> <arg-type:%s>", 
//						clazz, m.getName(), value, (null==value)?"null":value.getClass()));
			}
		}
		
		return object;
	}
	
	/**
	 * 将Map列表转换为类型是T的实例列表
	 * @param maps
	 * @return
	 * @throws Exception
	 */
	public final static <T> List<T> fromMaps(Class<T> clazz, List<Map<String,Object>> maps) throws Exception {
		
		if (null == maps) {
			return null;
		}

		Map<String,Method> columnToMethod = getColumnToMethod(clazz);

		List<T> objects = new ArrayList<T>();
		
		for (Map<String,Object> map: maps) {
			
			if (null == map) {
				continue;
			}

			T obj = clazz.getConstructor().newInstance();
			
			for (String column : columnToMethod.keySet()) {
				
				Object value = map.get(column);
				
				if (map.containsKey(column)) {
					Method m = columnToMethod.get(column);
					m.invoke(obj, value);
//					Logger.debug(String.format("<class:%s> <method:%s> <arg:%s> <arg-type:%s>", 
//							clazz, m.getName(), value, (null==value)?"null":value.getClass()));
				}
			}
			
			objects.add(obj);
		}
		
		return objects;
	}
}
