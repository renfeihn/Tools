package cn.com.agree.aweb.service.impl;

import java.lang.reflect.Method;
import java.lang.reflect.Type;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.service.IRemoteService;
import net.sf.cglib.proxy.InvocationHandler;

public class CamaServiceInvoke implements InvocationHandler {

	private transient IRemoteService remoteService;
	private String serviceName;
	private String mc;
	private String tc;

	public CamaServiceInvoke(IRemoteService remoteService, String serviceName, String mc, String tc) {
		this.remoteService = remoteService;
		this.serviceName = serviceName;
		this.mc = mc;
		this.tc = tc;
	}

	@Override
	public Object invoke(final Object proxy, final Method method, final Object[] arguments) throws Throwable {
		return invokeInternal(proxy, method, arguments);
	}

	private Object invokeInternal(Object proxy, Method method, Object[] arguments) {
		String methodName = method.getName();
		Class<?> clazz = method.getDeclaringClass();
		if (clazz == Object.class) {
			if (methodName.equals("hashCode")) {
				return new Integer(System.identityHashCode(proxy));
			} else if (methodName.equals("equals")) {
				return (proxy == arguments[0] ? Boolean.TRUE : Boolean.FALSE);
			} else if (methodName.equals("toString")) {
				return proxy.getClass().getName() + '@' + Integer.toHexString(proxy.hashCode());
			}
		}

		JSONObject reqData = new JSONObject();
		reqData.put("s", serviceName);
		reqData.put("c", clazz.getName());
		reqData.put("m", methodName);

		Class<?>[] ptypes = method.getParameterTypes();
		if (ptypes != null && ptypes.length > 0) {
			JSONArray types = new JSONArray();
			JSONArray args = new JSONArray();
			for (int i = 0; i < ptypes.length; i++) {
				types.add(ptypes[i].getName());
				args.add(arguments[i]);
			}
			reqData.put("t", types);
			reqData.put("p", args);
		}
		JSONObject rspData = remoteService.exchange(mc, tc, reqData);
		Object result = rspData.getBytes("r");
		Type type = method.getGenericReturnType();
		return ConvertUtils.convert(result, type);
	}

}
