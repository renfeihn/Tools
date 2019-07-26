package tc.cama.aweb.bean;

import cn.com.agree.aweb.exception.AfaConfigException;

public class ServiceConfigNodeFactory
{

	public ServiceConfigNodeFactory()
	{
	}

	public static ServiceConfigNode createLsrService(byte contents[], int gid, int mid, int sid, String serviceType)
		throws AfaConfigException
	{
		if ("socketOptions".equalsIgnoreCase(serviceType))
			return new SocketServiceConfigNode(contents, gid, mid, sid);
		if ("mqOptions".equalsIgnoreCase(serviceType))
			return new MQServiceConfigNode(contents, gid, mid, sid, AfaDeviceType.LSRSERVICE);
		if ("tasks".equalsIgnoreCase(serviceType))
			return new TasksServiceConfigNode(contents, gid, mid, sid);
		if ("lpcOptions".equalsIgnoreCase(serviceType))
			return new LPCServiceConfigNode(contents, gid, mid, sid);
		if ("rpcOptions".equalsIgnoreCase(serviceType))
			return new RPCServiceConfigNode(contents, gid, mid, sid);
		if ("replyOptions".equalsIgnoreCase(serviceType))
			return new ReplyServiceConfigNode(contents, gid, mid, sid);
		if ("aftOptions".equalsIgnoreCase(serviceType))
			return new AFTServiceConfigNode(contents, gid, mid, sid);
		if ("wsOptions".equalsIgnoreCase(serviceType))
			return new WebServiceConfigNode(contents, gid, mid, sid);
		if ("iscOptions".equalsIgnoreCase(serviceType))
			return new ISCServiceConfigNode(contents, gid, mid, sid, AfaDeviceType.LSRSERVICE);
		if ("aimPlatOptions".equals(serviceType))
			return new AimPlatServiceConfigNode(contents, gid, mid, sid);
		if ("httpOptions".equals(serviceType))
			return new HttpServiceConfigNode(contents, gid, mid, sid);
		else
			throw new AfaConfigException((new StringBuilder("不存在服务类型为 ")).append(serviceType).append(" 的接入服务!").toString());
	}

	public static ServiceConfigNode createOutService(byte contents[], int gid, int mid, int sid, String serviceType)
		throws AfaConfigException
	{
		if ("mqOptions".equalsIgnoreCase(serviceType))
			return new MQServiceConfigNode(contents, gid, mid, sid, AfaDeviceType.OUTSERVICE);
		if ("iscOptions".equalsIgnoreCase(serviceType))
			return new ISCServiceConfigNode(contents, gid, mid, sid, AfaDeviceType.OUTSERVICE);
		if ("websocketOptions".equalsIgnoreCase(serviceType))
			return new WebSocketServiceConfigNode(contents, gid, mid, sid);
		if ("asyncSocketOptions".equalsIgnoreCase(serviceType))
			return new AsyncSocketServiceConfigNode(contents, gid, mid, sid);
		if ("delayedOptions".equalsIgnoreCase(serviceType))
			return new DelayedServiceConfigNode(contents, gid, mid, sid);
		if ("tciOptions".equalsIgnoreCase(serviceType))
			return new TCIServiceConfigNode(contents, gid, mid, sid);
		if ("yongLongOptions".equals(serviceType))
			return new YongLongServiceConfigNode(contents, gid, mid, sid, AfaDeviceType.OUTSERVICE);
		if ("esbOptions".equals(serviceType))
			return new EsbServiceConfigNode(contents, gid, mid, sid);
		else
			throw new AfaConfigException((new StringBuilder("不存在服务类型为 ")).append(serviceType).append(" 的接出服务!").toString());
	}

	public static ServiceConfigNode createLsrService(String configStr, String serviceType)
		throws AfaConfigException
	{
		if ("socketOptions".equalsIgnoreCase(serviceType))
			return new SocketServiceConfigNode(configStr);
		if ("mqOptions".equalsIgnoreCase(serviceType))
			return new MQServiceConfigNode(configStr, AfaDeviceType.LSRSERVICE);
		if ("tasks".equalsIgnoreCase(serviceType))
			return new TasksServiceConfigNode(configStr);
		if ("lpcOptions".equalsIgnoreCase(serviceType))
			return new LPCServiceConfigNode(configStr);
		if ("rpcOptions".equalsIgnoreCase(serviceType))
			return new RPCServiceConfigNode(configStr);
		if ("replyOptions".equalsIgnoreCase(serviceType))
			return new ReplyServiceConfigNode(configStr);
		if ("aftOptions".equalsIgnoreCase(serviceType))
			return new AFTServiceConfigNode(configStr);
		if ("wsOptions".equalsIgnoreCase(serviceType))
			return new WebServiceConfigNode(configStr);
		if ("iscOptions".equalsIgnoreCase(serviceType))
			return new ISCServiceConfigNode(configStr, AfaDeviceType.LSRSERVICE);
		if ("aimPlatOptions".equalsIgnoreCase(serviceType))
			return new AimPlatServiceConfigNode(configStr);
		if ("httpOptions".equals(serviceType))
			return new HttpServiceConfigNode(configStr);
		else
			throw new AfaConfigException((new StringBuilder("不存在服务类型为 ")).append(serviceType).append(" 的接入服务!").toString());
	}

	public static ServiceConfigNode createOutService(String configStr, String serviceType)
		throws AfaConfigException
	{
		if ("mqOptions".equalsIgnoreCase(serviceType))
			return new MQServiceConfigNode(configStr, AfaDeviceType.OUTSERVICE);
		if ("iscOptions".equalsIgnoreCase(serviceType))
			return new ISCServiceConfigNode(configStr, AfaDeviceType.OUTSERVICE);
		if ("websocketOptions".equalsIgnoreCase(serviceType))
			return new WebSocketServiceConfigNode(configStr);
		if ("asyncSocketOptions".equalsIgnoreCase(serviceType))
			return new AsyncSocketServiceConfigNode(configStr);
		if ("delayedOptions".equalsIgnoreCase(serviceType))
			return new DelayedServiceConfigNode(configStr);
		if ("redisOptions".equalsIgnoreCase(serviceType))
			return new RedisServiceConfigNode(configStr);
		if ("tciOptions".equalsIgnoreCase(serviceType))
			return new TCIServiceConfigNode(configStr);
		if ("yongLongOptions".equals(serviceType))
			return new YongLongServiceConfigNode(configStr, AfaDeviceType.OUTSERVICE);
		if ("esbOptions".equals(serviceType))
			return new EsbServiceConfigNode(configStr, AfaDeviceType.OUTSERVICE);
		else
			throw new AfaConfigException((new StringBuilder("不存在服务类型为 ")).append(serviceType).append(" 的接出服务!").toString());
	}

	public static ServiceConfigNode createDcmService(String configStr, String serviceType)
		throws AfaConfigException
	{
		if ("ehcacheOptions".equalsIgnoreCase(serviceType))
			return new EhcacheServiceConfigNode(configStr);
		if ("redisOptions".equals(serviceType))
			return new RedisServiceConfigNode(configStr);
		if ("memcachedOptions".equals(serviceType))
			return new MemcachedServiceConfigNode(configStr);
		else
			throw new AfaConfigException((new StringBuilder("不存在服务类型为 ")).append(serviceType).append(" 的DCM服务!").toString());
	}

	public static ServiceConfigNode createDcmService(byte contents[], int gid, int sid, String serviceType)
		throws AfaConfigException
	{
		if ("ehcacheOptions".equalsIgnoreCase(serviceType))
			return new EhcacheServiceConfigNode(contents, gid, sid);
		if ("redisOptions".equals(serviceType))
			return new RedisServiceConfigNode(contents, gid, sid);
		if ("memcachedOptions".equals(serviceType))
			return new MemcachedServiceConfigNode(contents, gid, sid);
		else
			throw new AfaConfigException((new StringBuilder("不存在服务类型为 ")).append(serviceType).append(" 的DCM服务!").toString());
	}
}

