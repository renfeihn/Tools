package cn.com.agree.aweb.service.impl;

import java.util.HashMap;
import java.util.Map;

import tc.bank.cama.cmdb.service.CmdbServiceFactory;

/**
 * cmdb服务工厂
 * 
 * @author Win7-user
 *
 */
public class CmdbServiceFactoryImpl implements CmdbServiceFactory {

	private Map<String, Object> cmdbServices = new HashMap<String, Object>();

	public void setServices(Map<String, Object> cmdbServices) {
		if (cmdbServices == null) {
			return;
		}
		this.cmdbServices.putAll(cmdbServices);
	}

	public <T> T getService(Class<T> clazz) {
		return getService(clazz.getName());
	}

	@SuppressWarnings("unchecked")
	@Override
	public <T> T getService(String className) {
		Object obj = cmdbServices.get(className);
		if (obj == null) {
			return null;
		}
		return (T) obj;
	}

}
