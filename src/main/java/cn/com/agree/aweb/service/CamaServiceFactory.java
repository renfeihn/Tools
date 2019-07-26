package cn.com.agree.aweb.service;

import org.springframework.beans.factory.BeanClassLoaderAware;

import cn.com.agree.aweb.service.impl.CamaServiceInvoke;
import net.sf.cglib.proxy.Proxy;

public class CamaServiceFactory implements BeanClassLoaderAware {

	private transient ClassLoader proxyClassLoader;
	private transient boolean classLoaderConfigured;
	private transient IRemoteService remoteService;
	private String serviceName;
	private transient String defaultMc;
	private transient String defaultTc;

	public CamaServiceFactory(String serviceName) {
		this.serviceName = serviceName;
	}

	public <T> T getCamaService(Class<T> clazz) {
		return getCamaService(clazz, defaultMc, defaultTc);
	}

	public <T> T getCamaService(Class<T> clazz, String mc, String tc) {
		if (!clazz.isInterface()) {
			throw new IllegalArgumentException(clazz.getName() + "is not an interface");
		}
		Object service = Proxy.newProxyInstance(proxyClassLoader, new Class[] { clazz },
				new CamaServiceInvoke(remoteService, serviceName, mc, tc));
		return clazz.cast(service);
	}

	public String getDefaultMc() {
		return defaultMc;
	}

	public String getDefaultTc() {
		return defaultTc;
	}

	public IRemoteService getRemoteService() {
		return remoteService;
	}

	@Override
	public void setBeanClassLoader(ClassLoader beanClassLoader) {
		if (!classLoaderConfigured) {
			proxyClassLoader = beanClassLoader;
		}
	}

	public void setDefaultMc(String defaultMc) {
		this.defaultMc = defaultMc;
	}

	public void setDefaultTc(String defaultTc) {
		this.defaultTc = defaultTc;
	}

	public void setProxyClassLoader(ClassLoader classLoader) {
		proxyClassLoader = classLoader;
		classLoaderConfigured = (classLoader != null);
	}

	public void setRemoteService(IRemoteService remoteService) {
		this.remoteService = remoteService;
	}
}
