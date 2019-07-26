package tc.bank.cama.cmdb.model.table;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Map;

import com.aim.alibaba.fastjson.annotation.JSONField;

/**
 * 对于需要实现获取字段标签名的POJO
 * <li> POJO类实现此接口, 并实现{@link #getFieldLabels()}方法(或使用已有的实现类{@link BaseColumnLabel})
 * <li> 其字段使用{@link Label}修饰
 */
public interface ColumnLabel {

	/**
	 * POJO字段的标签名注解
	 */
	@Retention(RetentionPolicy.RUNTIME)
	@Target(ElementType.FIELD)
	public static @interface Label {
		String value() default "";
	}

	@JSONField(name = "fieldLabels")
	Map<String,String> getFieldLabels();
}
