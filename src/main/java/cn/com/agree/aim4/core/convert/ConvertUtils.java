package cn.com.agree.aim4.core.convert;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.parser.Feature;

@SuppressWarnings("unchecked")
public class ConvertUtils {

	private static final Map<Class<?>, Object> primitiveDefaults = new HashMap<Class<?>, Object>(8);
	static {
		primitiveDefaults.put(Integer.TYPE, Integer.valueOf(0));
		primitiveDefaults.put(Short.TYPE, Short.valueOf((short) 0));
		primitiveDefaults.put(Byte.TYPE, Byte.valueOf((byte) 0));
		primitiveDefaults.put(Float.TYPE, Float.valueOf(0f));
		primitiveDefaults.put(Double.TYPE, Double.valueOf(0d));
		primitiveDefaults.put(Long.TYPE, Long.valueOf(0L));
		primitiveDefaults.put(Boolean.TYPE, Boolean.FALSE);
		primitiveDefaults.put(Character.TYPE, Character.valueOf((char) 0));
	}

	public static <T> T convert(Object value, Class<T> clazz) {
		if (clazz == void.class) {
			return null;
		}
		if (value == null) {
			if (primitiveDefaults.containsKey(clazz)) {
				return (T) primitiveDefaults.get(clazz);
			}
			return null;
		}

		if (clazz != Object.class && clazz.isInstance(value)) {
			return (T) value;
		}

		if (value instanceof byte[]) {
			return JSON.parseObject((byte[]) value, clazz, Feature.OrderedField);
		}

		String jsonString = JSON.toJSONString(value);
		return (T) JSON.parseObject(jsonString, clazz, Feature.OrderedField);
	}

	public static <T> T convert(Object value, Type targetType) {
		Class<?> targetClass = targetType.getClass();
		if (targetClass == Class.class) {
			return convert(value, (Class<T>) targetType);
		}

		if (value instanceof byte[]) {
			return JSON.parseObject((byte[]) value, targetType, Feature.OrderedField);
		}

		String jsonString = JSON.toJSONString(value);
		return JSON.parseObject(jsonString, targetType, Feature.OrderedField);
	}

}
