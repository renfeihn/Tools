package tc.cama.aweb.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;

public class Object2MapUtil {
	public static Map<String,Object> toMap(Object o){
		if(o==null){
			return null;
		}
		Map<String,Object> ret = new HashMap<String, Object>();
		Field[] fields = o.getClass().getDeclaredFields();
		for(Field f : fields){
			String fieldname = f.getName();
			String method = "get"+fieldname.substring(0,1).toUpperCase()+(fieldname.length()>1?fieldname.substring(1):"");
			try {
				Method m = o.getClass().getDeclaredMethod(method, (Class<?>[])null);
				if(m==null){
					continue;
				}
				ret.put(fieldname, m.invoke(o, (Object[])null));
			} catch (Exception e) {
				// TODO 自动生成的 catch 块
				continue;
			} 
		}
		return ret;
	}
	
	public static Map<String,Object> toAnnotationMap(Object o){
		if(o==null){
			return null;
		}
		Map<String,Object> ret = new HashMap<String, Object>();
		Field[] fields = o.getClass().getDeclaredFields();
		for(Field f : fields){
			String fieldname = f.getName();
			String columnName = "";
			Column cn = f.getAnnotation(Column.class);
			if(cn!=null){
				columnName = cn.name();
			}else{
				String method = "set"+fieldname.substring(0,1).toUpperCase()+(fieldname.length()>1?fieldname.substring(1):"");
				try {
					Method setM = o.getClass().getDeclaredMethod(method, f.getType());
					cn = setM.getAnnotation(Column.class);
					if(cn!=null){
						columnName = cn.name();
					}
				} catch (Exception e) {
					// TODO 自动生成的 catch 块
				}
			}
			if("".equals(columnName)){
				continue;
			}
			String method = "get"+fieldname.substring(0,1).toUpperCase()+(fieldname.length()>1?fieldname.substring(1):"");
			try {
				Method m = o.getClass().getDeclaredMethod(method, (Class<?>[])null);
				if(m==null){
					continue;
				}
				ret.put(columnName, m.invoke(o, (Object[])null));
			} catch (Exception e) {
				// TODO 自动生成的 catch 块
				continue;
			} 
		}
		return ret;
	}
	
	public static <T> T clone (T t){
		Class classT = t.getClass();
		T clone = null;
		try {
			clone = (T) classT.newInstance();
		} catch (InstantiationException e1) {
			// TODO 自动生成的 catch 块
			e1.printStackTrace();
		} catch (IllegalAccessException e1) {
			// TODO 自动生成的 catch 块
			e1.printStackTrace();
		}
		Field[] fields = classT.getDeclaredFields();
		for (Field f : fields) {
			try {
				String fieldname = f.getName();
				String methodget = "get"
						+ fieldname.substring(0, 1).toUpperCase()
						+ (fieldname.length() > 1 ? fieldname.substring(1) : "");
				Method mget = classT.getDeclaredMethod(methodget,
						(Class<?>[]) null);
				String methodset = "set"+fieldname.substring(0,1).toUpperCase()+(fieldname.length()>1?fieldname.substring(1):"");
				Method mset = classT.getDeclaredMethod(methodset, f.getType());
				if (mget==null || mset==null) {
					continue;
				}
				mset.invoke(clone, mget.invoke(t, (Object[])null));
			} catch (Exception e) {
				// TODO 自动生成的 catch 块
				continue;
			}
		}
		return clone;
	}
}
