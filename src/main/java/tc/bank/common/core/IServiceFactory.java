package tc.bank.common.core;

import java.util.Map;

public interface IServiceFactory {

	public void setServices(Map<String, Object> services);

	public <T> T getService(Class<T> clazz);

	public <T> T getService(String className);
}
