// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   ConfigManager.java

package tc.cama.aweb.bean;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.afa.core.device.DeviceFactory;
import cn.com.agree.afa.core.device.VirtualDevice;
import cn.com.agree.afa.core.scoreboard.DeviceState;
import cn.com.agree.afa.omi.ConfigFile;
import cn.com.agree.afa.omi.IOperationsManager;
import cn.com.agree.afa.omi.OmiException;
import cn.com.agree.aweb.exception.AfaConfigException;
import cn.com.agree.aweb.util.AfaCommonUtil;
import cn.com.agree.aweb.util.CommonUtils;
import tc.cama.aweb.utils.AFAContainer;
import tc.cama.aweb.utils.SchemaManager;

//Referenced classes of package cn.com.agree.aweb.afa4j.config.xml:
//			ConfigFileXPath

public class ConfigManager
{

	private static Map<IOperationsManager, ConfigFile> configFiles = new HashMap();
	  private static Map<IOperationsManager, ConfigManager> configManagers = new HashMap();
	  private Document document;
	  public static final String ID = "id";
	  public static final String NAME = "name";
	  public static final String TYPE = "type";
	private ConfigManager(Document document)
	{
		this.document = document;
	}

	public static synchronized ConfigManager createConfigManager(IOperationsManager manager)
		throws DocumentException, OmiException, UnsupportedEncodingException
	{
		ConfigManager configManager = (ConfigManager)configManagers.get(manager);
		ConfigFile configFile = manager.getConfigFile();
		boolean isLastedConfig = getConfigFile(manager, false).getLastTimestamp() == configFile.getLastTimestamp();
		if (configManager == null || !isLastedConfig)
		{
			if (!isLastedConfig)
				configFiles.put(manager, configFile);
			SAXReader reader = new SAXReader();
			Document document = reader.read(new InputStreamReader(new ByteArrayInputStream(getConfigContents(manager)), "UTF-8"));
			configManager = new ConfigManager(document);
			configManagers.put(manager, configManager);
		}
		return configManager;
	}

	public static synchronized void removeConfigManager(IOperationsManager manager)
	{
		if (manager != null && configManagers.containsKey(manager))
			configManagers.remove(manager);
	}

	private static synchronized ConfigFile getConfigFile(IOperationsManager manager, boolean inRealTime)
		throws OmiException
	{
		if (DeviceState.Stopped.equals(AFAContainer.getManagerState(manager)))
			return null;
		ConfigFile configFile = null;
		if (configFiles.get(manager) == null)
		{
			configFile = manager.getConfigFile();
			configFiles.put(manager, configFile);
		} else
		if (inRealTime)
		{
			configFile = manager.getConfigFile();
			if (((ConfigFile)configFiles.get(manager)).getLastTimestamp() != configFile.getLastTimestamp())
			{
				configFiles.put(manager, configFile);
				configManagers.remove(manager);
			}
		}
		return (ConfigFile)configFiles.get(manager);
	}

	public static byte[] getConfigContents(IOperationsManager manager)
		throws OmiException
	{
		return getConfigFile(manager, true).getConfigContents();
	}

	public static byte[] getSchemaContents(IOperationsManager manager)
		throws OmiException
	{
		return getConfigFile(manager, false).getSchemaContents();
	}

	public  IsolateState getIsolateState(IOperationsManager manager, AfaDeviceType afaDevType, String args[])
		throws AfaConfigException, OmiException, DocumentException
	{
		SchemaManager schemaManager = AfaCommonUtil.getSchemaManager(manager);
		boolean canIsolate = false;
		Element isolateEle = null;
		int gid = 0;
		switch (afaDevType)
		{
		case DCM: 
		{
			canIsolate = schemaManager.getDevIsolatedFlag(AfaDeviceType.PLATFORM, new String[0]);
			isolateEle = selectSingleNode(ConfigFileXPath.instanceIsolate());
			break;
		}

		case DCMSERVICE: 
		{
			canIsolate = schemaManager.getDevIsolatedFlag(AfaDeviceType.WORKGROUP, new String[0]);
			Element insIsolateEle = selectSingleNode(ConfigFileXPath.instanceIsolate());
			if (insIsolateEle != null && Boolean.parseBoolean(insIsolateEle.getText()))
			{
				isolateEle = insIsolateEle;
			} else
			{
				gid = Integer.parseInt(args[0]);
				isolateEle = selectSingleNode(ConfigFileXPath.workgroupIsolate(gid));
			}
			break;
		}

		case PLATFORM: 
		{
			String serviceType = args[3];
			canIsolate = schemaManager.getDevIsolatedFlag(AfaDeviceType.LSRSERVICE, new String[] {
				serviceType
			});
			Element insIsolateEle = selectSingleNode(ConfigFileXPath.instanceIsolate());
			if (insIsolateEle != null && Boolean.parseBoolean(insIsolateEle.getText()))
			{
				isolateEle = insIsolateEle;
			} else
			{
				gid = Integer.parseInt(args[0]);
				Element wkgIsolateEle = selectSingleNode(ConfigFileXPath.workgroupIsolate(gid));
				if (wkgIsolateEle != null && Boolean.parseBoolean(wkgIsolateEle.getText()))
				{
					isolateEle = wkgIsolateEle;
				} else
				{
					int mid = Integer.parseInt(args[1]);
					int sid = Integer.parseInt(args[2]);
					isolateEle = selectSingleNode(ConfigFileXPath.lsrServiceIsolate(gid, mid, sid));
				}
			}
			break;
		}
		}
		if (!canIsolate || isolateEle == null)
			return IsolateState.CannotIsolate;
		IsolateState state = IsolateState.NonIsolate;
		String isolateVal = isolateEle.getText();
		if (Boolean.parseBoolean(isolateVal))
			state = IsolateState.Isolated;
		return state;
	}

	public void isolateInstance(IOperationsManager manager, SchemaManager schemaManager, IsolateAction action)
		throws AfaConfigException, OmiException, IOException
	{
		boolean canIsolate = schemaManager.getDevIsolatedFlag(AfaDeviceType.PLATFORM, new String[0]);
		if (!canIsolate)
			throw new AfaConfigException("该实例不支持隔离!");
		Element insIsolateEle = selectSingleNode(ConfigFileXPath.instanceIsolate());
		if (insIsolateEle == null)
			throw new AfaConfigException("该实例未配置隔离节点[isolate]!");
		insIsolateEle.setText(action.getAction());
		Element wkgsEle = selectSingleNode(ConfigFileXPath.workgroups());
		List wkgEles = wkgsEle.elements();
		Element wkgEle;
		for (Iterator iterator = wkgEles.iterator(); iterator.hasNext(); isolateWorkgroup(manager, Integer.parseInt(wkgEle.attributeValue("id")), schemaManager, action, false))
			wkgEle = (Element)iterator.next();

		manager.updateGlobalConfig(getByteArray(document));
	}

	public void isolateWorkgroup(IOperationsManager manager, int gid, SchemaManager schemaManager, IsolateAction action, boolean autoUpdate)
		throws AfaConfigException, OmiException, IOException
	{
		boolean canIsolate = schemaManager.getDevIsolatedFlag(AfaDeviceType.WORKGROUP, new String[0]);
		if (!canIsolate)
			throw new AfaConfigException(String.format("该实例下工作组[gid=%d]不支持隔离!", new Object[] {
				Integer.valueOf(gid)
			}));
		Element wkgIsolateEle = selectSingleNode(ConfigFileXPath.workgroupIsolate(gid));
		if (wkgIsolateEle == null)
			throw new AfaConfigException(String.format("该实例下工作组[gid=%d]未配置隔离节点[isolation]", new Object[] {
				Integer.valueOf(gid)
			}));
		wkgIsolateEle.setText(action.getAction());
		Element lsrsEle = selectSingleNode(ConfigFileXPath.lsrs(gid));
		List lsrEles = lsrsEle.elements();
		for (Iterator iterator = lsrEles.iterator(); iterator.hasNext();)
		{
			Element lsrEle = (Element)iterator.next();
			int mid = Integer.parseInt(lsrEle.attributeValue("id"));
			Element lsrServicesEle = selectSingleNode(ConfigFileXPath.lsrServices(gid, mid));
			List lsrServiceEles = lsrServicesEle.elements();
			int sid;
			String serviceType;
			for (Iterator iterator1 = lsrServiceEles.iterator(); iterator1.hasNext(); isolateService(manager, gid, mid, sid, ModuleType.LSR, schemaManager, serviceType, action, false))
			{
				Element lsrServiceEle = (Element)iterator1.next();
				sid = Integer.parseInt(lsrServiceEle.attributeValue("id"));
				serviceType = lsrServiceEle.attributeValue("type");
			}

		}

		 if (autoUpdate) {
		      manager.updateDevice(getByteArray(this.document), DeviceFactory.getVDGroup(gid));
		    }
	}

	public void isolateService(IOperationsManager manager, int gid, int mid, int sid, ModuleType moduleType, SchemaManager schemaManager, String serviceType, 
			IsolateAction action, boolean autoUpdate)
		throws AfaConfigException, OmiException, IOException
	{
		boolean canIsolate = false;
		switch (moduleType)
		{
		case DCM: // '\003'
			canIsolate = schemaManager.getDevIsolatedFlag(AfaDeviceType.LSRSERVICE, new String[] {
				serviceType
			});
			break;
		}
		if (!canIsolate)
			return;
		Element srvIsolateEle = selectSingleNode(ConfigFileXPath.lsrServiceIsolate(gid, mid, sid));
		if (srvIsolateEle == null)
			throw new AfaConfigException(String.format("该实例下接入服务[gid=%d, mid=%d, sid=%d]未配置隔离节点[isolate]", new Object[] {
				Integer.valueOf(gid), Integer.valueOf(mid), Integer.valueOf(sid)
			}));
		srvIsolateEle.setText(action.getAction());
		if (autoUpdate)
			manager.updateDevice(getByteArray(document), DeviceFactory.getVDService(gid, mid, ModuleType.LSR, sid));
	}

	public void addWorkgroup(IOperationsManager manager, Element element, int gid, String name)
		throws OmiException, IOException
	{
		if (element == null)
			return;
		element.attribute("id").setValue((new StringBuilder(String.valueOf(gid))).toString());
		element.attribute("name").setValue(name);
		Element workgroups = selectSingleNode(ConfigFileXPath.workgroups());
		workgroups.add((Element)element.clone());
		VirtualDevice device = DeviceFactory.getVDGroup(gid);
		try
		{
			addDevice(manager, device);
		}
		catch (OmiException e)
		{
			removeWorkgroup(manager, gid);
			throw e;
		}
	}

	public void removeWorkgroup(IOperationsManager manager, int gid)
		throws OmiException, IOException
	{
		Element workgroup = selectSingleNode(ConfigFileXPath.workgroup(gid));
		if (workgroup != null)
			workgroup.getParent().remove(workgroup);
		VirtualDevice device = DeviceFactory.getVDGroup(gid);
		removeDevice(manager, device);
	}

	public void addLsrModule(IOperationsManager manager, Element element, int gid, int mid, String name)
		throws OmiException, IOException
	{
		if (element == null)
			return;
		element.attribute("id").setValue((new StringBuilder(String.valueOf(mid))).toString());
		element.attribute("name").setValue(name);
		Element lsrs = selectSingleNode(ConfigFileXPath.lsrs(gid));
		lsrs.add((Element)element.clone());
		VirtualDevice device = DeviceFactory.getVDModule(gid, mid, ModuleType.LSR);
		try
		{
			addDevice(manager, device);
		}
		catch (OmiException e)
		{
			removeLsrModule(manager, gid, mid, ModuleType.LSR);
			throw e;
		}
	}

	public void removeLsrModule(IOperationsManager manager, int gid, int mid, ModuleType moduleType)
		throws OmiException, IOException
	{
		Element lsr = selectSingleNode(ConfigFileXPath.lsr(gid, mid));
		if (lsr != null)
			lsr.getParent().remove(lsr);
		VirtualDevice device = DeviceFactory.getVDModule(gid, mid, moduleType);
		removeDevice(manager, device);
	}

	public void addLsrService(IOperationsManager manager, Element element, int gid, int mid, int sid, String name, int typeNum)
		throws OmiException, IOException
	{
		if (element == null)
			return;
		element.attribute("id").setValue((new StringBuilder(String.valueOf(sid))).toString());
		element.attribute("name").setValue(name);
		element.attribute("type").setValue((new StringBuilder(String.valueOf(typeNum))).toString());
		Element services = selectSingleNode(ConfigFileXPath.lsrServices(gid, mid));
		services.add((Element)element.clone());
		VirtualDevice device = DeviceFactory.getVDService(gid, mid, ModuleType.LSR, sid);
		try
		{
			addDevice(manager, device);
		}
		catch (OmiException e)
		{
			removeLsrService(manager, gid, mid, ModuleType.LSR, sid);
			throw e;
		}
	}

	public void removeLsrService(IOperationsManager manager, int gid, int mid, ModuleType moduleType, int sid)
		throws OmiException, IOException
	{
		Element service = selectSingleNode(ConfigFileXPath.lsrService(gid, mid, sid));
		if (service != null)
			service.getParent().remove(service);
		VirtualDevice device = DeviceFactory.getVDService(gid, mid, moduleType, sid);
		removeDevice(manager, device);
	}

	public void addOutModule(IOperationsManager manager, Element element, int gid, int mid, String name)
		throws OmiException, IOException
	{
		if (element == null)
			return;
		element.attribute("id").setValue((new StringBuilder(String.valueOf(mid))).toString());
		element.attribute("name").setValue(name);
		Element lsrs = selectSingleNode(ConfigFileXPath.outs(gid));
		lsrs.add((Element)element.clone());
		VirtualDevice device = DeviceFactory.getVDModule(gid, mid, ModuleType.OUT);
		try
		{
			addDevice(manager, device);
		}
		catch (OmiException e)
		{
			removeOutModule(manager, gid, mid, ModuleType.OUT);
			throw e;
		}
	}

	public void removeOutModule(IOperationsManager manager, int gid, int mid, ModuleType moduleType)
		throws OmiException, IOException
	{
		Element out = selectSingleNode(ConfigFileXPath.out(gid, mid));
		if (out != null)
			out.getParent().remove(out);
		VirtualDevice device = DeviceFactory.getVDModule(gid, mid, moduleType);
		removeDevice(manager, device);
	}

	public void addOutService(IOperationsManager manager, Element element, int gid, int mid, int sid, String name, int typeNum)
		throws OmiException, IOException
	{
		if (element == null)
			return;
		element.attribute("id").setValue((new StringBuilder(String.valueOf(sid))).toString());
		element.attribute("name").setValue(name);
		element.attribute("type").setValue((new StringBuilder(String.valueOf(typeNum))).toString());
		Element services = selectSingleNode(ConfigFileXPath.outServices(gid, mid));
		services.add((Element)element.clone());
		VirtualDevice device = DeviceFactory.getVDService(gid, mid, ModuleType.OUT, sid);
		try
		{
			addDevice(manager, device);
		}
		catch (OmiException e)
		{
			removeOutService(manager, gid, mid, ModuleType.OUT, sid);
			throw e;
		}
	}

	public void removeOutService(IOperationsManager manager, int gid, int mid, ModuleType moduleType, int sid)
		throws OmiException, IOException
	{
		Element service = selectSingleNode(ConfigFileXPath.outService(gid, mid, sid));
		if (service != null)
			service.getParent().remove(service);
		VirtualDevice device = DeviceFactory.getVDService(gid, mid, moduleType, sid);
		removeDevice(manager, device);
	}

	public void addDcmService(IOperationsManager manager, Element element, int gid, int sid, String name, int typeNum)
		throws OmiException, IOException
	{
		if (element == null)
			return;
		element.attribute("id").setValue((new StringBuilder(String.valueOf(sid))).toString());
		element.attribute("name").setValue(name);
		element.attribute("type").setValue((new StringBuilder(String.valueOf(typeNum))).toString());
		Element services = selectSingleNode(ConfigFileXPath.dcmServices(gid));
		services.add((Element)element.clone());
		VirtualDevice device = DeviceFactory.getVDService(gid, 0, ModuleType.DCM, sid);
		try
		{
			addDevice(manager, device);
		}
		catch (OmiException e)
		{
			throw e;
		}
	}

	public void removeDcmService(IOperationsManager manager, int gid, int mid, ModuleType moduleType, int sid)
		throws OmiException, IOException
	{
		Element service = selectSingleNode(ConfigFileXPath.dcmService(gid, sid));
		if (service != null)
			service.getParent().remove(service);
		VirtualDevice device = DeviceFactory.getVDService(gid, mid, moduleType, sid);
		removeDevice(manager, device);
	}

	private void addDevice(IOperationsManager manager, VirtualDevice device)
		throws OmiException, IOException
	{
		manager.addDevice(getByteArray(document), device);
	}

	private void removeDevice(IOperationsManager manager, VirtualDevice device)
		throws OmiException, IOException
	{
		if (!manager.getDeviceState(device).equals(DeviceState.Stopped))
			manager.stopDevice(device);
		manager.removeDevice(getByteArray(document), device);
	}

	public int getAvailableDeviceId(AfaDeviceType type)
	{
		return multiplexId(selectSingleNode(ConfigFileXPath.workgroups()));
	}

	public int getAvailableDeviceId(AfaDeviceType type, int gid)
	{
		int mid = 0;
		switch (type)
		{
		case LSR: // '\007'
			mid = multiplexId(selectSingleNode(ConfigFileXPath.lsrs(gid)));
			break;

		case  OUT: // '\t'
			mid = multiplexId(selectSingleNode(ConfigFileXPath.outs(gid)));
			break;

		case DCM: // '\005'
			mid = multiplexId(selectSingleNode(ConfigFileXPath.dcm(gid)));
			break;
		}
		return mid;
	}

	public int getAvailableDeviceId(AfaDeviceType type, int gid, int mid)
	{
		int sid = 0;
		switch (type)
		{
		case LSR: // '\007'
			sid = multiplexId(selectSingleNode(ConfigFileXPath.lsrServices(gid, mid)));
			break;

		case OUT: // '\t'
			sid = multiplexId(selectSingleNode(ConfigFileXPath.outServices(gid, mid)));
			break;

		case DCM: // '\005'
			sid = multiplexId(selectSingleNode(ConfigFileXPath.dcmServices(gid)));
			break;
		}
		return sid;
	}

	private int multiplexId(Element parent)
	{
		int result = 1;
		List childs = parent.elements();
		if (childs != null && childs.size() > 0)
		{
			List tempList = new ArrayList();
			int id;
			for (Iterator iterator = childs.iterator(); iterator.hasNext(); tempList.add(Integer.valueOf(id)))
			{
				Element e = (Element)iterator.next();
				String strId = e.attributeValue("id");
				if (strId == null)
					return 1;
				id = Integer.parseInt(strId);
			}

			Collections.sort(tempList);
			if (((Integer)tempList.get(0)).intValue() != 1)
			{
				result = 1;
			} else
			{
				int i = 0;
				for (int size = tempList.size(); i < size - 1; i++)
				{
					if (((Integer)tempList.get(i + 1)).intValue() - ((Integer)tempList.get(i)).intValue() == 1)
						continue;
					result = ((Integer)tempList.get(i)).intValue() + 1;
					break;
				}

				if (result == 1)
					result = ((Integer)tempList.get(tempList.size() - 1)).intValue() + 1;
			}
		}
		return result;
	}

	public Element selectSingleNode(String path)
	{
		if (path == null)
		{
			return null;
		} else
		{
			XPath xPath = ConfigFileXPath.createXPath(document, path);
			return (Element)xPath.selectSingleNode(document);
		}
	}

	public List selectNodes(String path)
	{
		if (path == null)
		{
			return null;
		} else
		{
			XPath xPath = ConfigFileXPath.createXPath(document, path);
			return xPath.selectNodes(document);
		}
	}

	public String getServiceTypeNum(String path)
	{
		if (path == null)
			return null;
		XPath xPath = ConfigFileXPath.createXPath(document, path);
		Element element = (Element)xPath.selectSingleNode(document);
		if (element == null)
			return null;
		else
			return element.attributeValue("type");
	}

	public static byte[] getByteArray(Document document)
		throws IOException
	{
		return CommonUtils.formatXmlConfig(document).getBytes("UTF-8");
	}

	public Document getDocument()
	{
		return document;
	}

	
}
