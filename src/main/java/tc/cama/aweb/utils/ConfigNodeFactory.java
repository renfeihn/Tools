package tc.cama.aweb.utils;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.aweb.exception.AfaConfigException;
import tc.cama.aweb.bean.DcmServiceConfigNode;
import tc.cama.aweb.bean.LsrModuleConfigNode;
import tc.cama.aweb.bean.LsrServiceConfigNode;
import tc.cama.aweb.bean.OutModuleConfigNode;
import tc.cama.aweb.bean.OutServiceConfigNode;
import tc.cama.aweb.bean.SvcModuleConfigNode;
import tc.cama.aweb.bean.WorkgroupConfigNode;

//Referenced classes of package cn.com.agree.aweb.afa4j.config.xml:
//			GlobalConfigNode, WorkgroupConfigNode, LsrModuleConfigNode, OutModuleConfigNode, 
//			SvcModuleConfigNode, LsrServiceConfigNode, OutServiceConfigNode, DcmServiceConfigNode, 
//			ConfigNodeSupport

public class ConfigNodeFactory
{

	private static int $SWITCH_TABLE$cn$com$agree$afa$core$ModuleType[];

	public ConfigNodeFactory()
	{
	}

	public static ConfigNodeSupport getGlobalNode(byte contents[])
		throws AfaConfigException
	{
		return new GlobalConfigNode(contents);
	}

	public static ConfigNodeSupport getGlobalNode(String configStr)
		throws AfaConfigException
	{
		return new GlobalConfigNode(configStr);
	}

	public static ConfigNodeSupport getWorkgroupNode(byte contents[], int gid)
		throws AfaConfigException
	{
		return new WorkgroupConfigNode(contents, gid);
	}

	public static ConfigNodeSupport getWorkgroupNode(String configStr)
		throws AfaConfigException
	{
		return new WorkgroupConfigNode(configStr);
	}

	public static ConfigNodeSupport getModuleNode(byte contents[], int gid, int mid, ModuleType mtype)
		throws AfaConfigException
	{
		switch (mtype)
		{	
		case LSR: // '\003'
			return new LsrModuleConfigNode(contents, gid, mid);

		case OUT: // '\004'
			return new OutModuleConfigNode(contents, gid, mid);

		case SVC: // '\002'
			return new SvcModuleConfigNode(contents, gid);
		}
		return null;
	}

	public static ConfigNodeSupport getModuleNode(String configStr, ModuleType mtype)
		throws AfaConfigException
	{
		switch (mtype)
		{
		case LSR: // '\003'
			return new LsrModuleConfigNode(configStr);

		case OUT: // '\004'
			return new OutModuleConfigNode(configStr);

		case SVC: // '\002'
			return new SvcModuleConfigNode(configStr);
		}
		return null;
	}

	public static ConfigNodeSupport getServiceNode(byte contents[], int gid, int mid, ModuleType mtype, int sid, String serviceType)
		throws AfaConfigException
	{
		switch (mtype)
		{
		case LSR: // '\003'
			return new LsrServiceConfigNode(contents, gid, mid, sid, serviceType);

		case OUT: // '\004'
			return new OutServiceConfigNode(contents, gid, mid, sid, serviceType);

		case DCM: // '\006'
			return new DcmServiceConfigNode(contents, gid, sid, serviceType);

		//case 5: // '\005'
		default:
			return null;
		}
	}

	public static ConfigNodeSupport getServiceNode(String configStr, ModuleType mtype, String serviceType)
		throws AfaConfigException
	{
		switch (mtype)
		{
		case LSR: // '\003'
			return new LsrServiceConfigNode(configStr, serviceType);

		case OUT: // '\004'
			//ConfigNodeSupport s = new OutServiceConfigNode(configStr, serviceType);
			return new OutServiceConfigNode(configStr, serviceType);

		case DCM: // '\006'
//			return new DcmServiceConfigNode(configStr, serviceType);
//
//		case 5: // '\005'
		default:
			return null;
		}
	}
}
