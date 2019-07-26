package tc.bank.cama.cmdb.model.table;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class BaseColumnLabel implements ColumnLabel {

	private Class<?> clazz;
	
	public BaseColumnLabel(Class<?> clazz) {
		this.clazz = clazz;
	}

	@Override
	public Map<String, String> getFieldLabels() {
		
		Map<String,String> fieldLabels = new HashMap<String,String>();
		
		Field[] thisFields = this.clazz.getDeclaredFields();
		
		if(null != thisFields && thisFields.length > 0) {
			
			for(Field field: thisFields) {
				
				Label label = field.getAnnotation(Label.class);
				
				// 类的字段名作为Map的键, Label注解的属性作为字段标签名
				if(null != label)
					fieldLabels.put(field.getName(), label.value());
			}
		}
		
		return fieldLabels;
	}

}
