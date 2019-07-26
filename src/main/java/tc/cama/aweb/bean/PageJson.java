package tc.cama.aweb.bean;
//Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
//Jad home page: http://kpdus.tripod.com/jad.html
//Decompiler options: packimports(3) fieldsfirst ansi space 
//Source File Name:   PageJson.java
import java.util.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
public class PageJson
{
	public class GroupJson
	{

		private String name;
		private String desp;
		private String xPath;
		private String uniqueId;
		private JSONArray fields;
		private GroupJson child;
		private JSONObject appendNode;
		final PageJson pageJson;

		public void addItem(ItemJson json)
		{
			fields.add(json);
		}

		public void setChild(GroupJson child)
		{
			this.child = child;
		}

		public void setDesp(String desp)
		{
			this.desp = desp;
		}

		public void setxPath(String xPath)
		{
			this.xPath = xPath;
		}

		public void setUniqueId(String uniqueId)
		{
			this.uniqueId = uniqueId;
		}

		public void setAppendNode(JSONObject appendNode)
		{
			this.appendNode = appendNode;
		}

		public String toString()
		{
			return (new StringBuilder(String.valueOf(name))).append(":").append(fields.toString()).toString();
		}

		public String getName()
		{
			return name;
		}

		public JSONArray getFields()
		{
			return fields;
		}

		public GroupJson getChild()
		{
			return child;
		}

		public String getDesp()
		{
			return desp;
		}

		public String getxPath()
		{
			return xPath;
		}

		public String getUniqueId()
		{
			return uniqueId;
		}

		public JSONObject getAppendNode()
		{
			return appendNode;
		}

		public GroupJson(String name)
		{
			super();
			pageJson = PageJson.this;
			this.name = name;
			fields = new JSONArray();
		}
	}


	private LinkedHashMap base;
	private LinkedHashMap core;
	private LinkedHashMap groups;
	private LinkedHashMap switches;
	private List tasks;
	private List lists;
	private LinkedHashMap dataSources;
	private LinkedHashMap codec;
	private LinkedHashMap factorys;
	private LinkedHashMap caches;
	private MonitorJson monitor;
	private LinkedHashMap appendNodes;

	private PageJson()
	{
		base = new LinkedHashMap();
		core = new LinkedHashMap();
		groups = new LinkedHashMap();
		switches = new LinkedHashMap();
		appendNodes = new LinkedHashMap();
	}

	public static PageJson allocate()
	{
		return new PageJson();
	}

	public void addBaseItem(String key, ItemJson json)
	{
		base.put(key, json);
	}

	public void addCoreItem(String key, Object json)
	{
		core.put(key, json);
	}

	public void addTask(BranchJson json)
	{
		computeTasksField().add(json);
	}

	public List computeTasksField()
	{
		List result = tasks;
		if (result == null)
			tasks = result = new ArrayList();
		return result;
	}

	public void addList(BranchJson json)
	{
		computeListsField().add(json);
	}

	public List computeListsField()
	{
		List result = lists;
		if (result == null)
			lists = result = new ArrayList();
		return result;
	}

	public void addDataSource(String key, BranchJson json)
	{
		computeDataSourcesField().put(key, json);
	}

	public LinkedHashMap computeDataSourcesField()
	{
		LinkedHashMap result = dataSources;
		if (result == null)
			dataSources = result = new LinkedHashMap();
		return result;
	}

	public void addCodec(String key, BranchJson json)
	{
		computeCodecField().put(key, json);
	}

	public LinkedHashMap computeCodecField()
	{
		LinkedHashMap result = codec;
		if (result == null)
			codec = result = new LinkedHashMap();
		return result;
	}

	public void addFactorys(String key, BranchJson json)
	{
		computeFactorysField().put(key, json);
	}

	public LinkedHashMap computeFactorysField()
	{
		LinkedHashMap result = factorys;
		if (result == null)
			factorys = result = new LinkedHashMap();
		return result;
	}

	public void addCaches(String key, BranchJson json)
	{
		computeCachesField().put(key, json);
	}

	public LinkedHashMap computeCachesField()
	{
		LinkedHashMap result = caches;
		if (result == null)
			caches = result = new LinkedHashMap();
		return result;
	}

	public void setMonitor(MonitorJson monitor)
	{
		this.monitor = monitor;
	}

	public void addAppendNodes(String key, Object json)
	{
		appendNodes.put(key, json);
	}

	public GroupJson group(String name)
	{
		if (groups.containsKey(name))
		{
			return (GroupJson)groups.get(name);
		} else
		{
			GroupJson group = new GroupJson(name);
			groups.put(name, group);
			return group;
		}
	}

	public SwitchJson switchs(String name)
	{
		if (switches.containsKey(name))
		{
			return (SwitchJson)switches.get(name);
		} else
		{
			SwitchJson switchs = new SwitchJson(name);
			switches.put(name, switchs);
			return switchs;
		}
	}

	public LinkedHashMap getBase()
	{
		return base;
	}

	public LinkedHashMap getCore()
	{
		return core;
	}

	public LinkedHashMap getGroups()
	{
		return groups;
	}

	public LinkedHashMap getSwitches()
	{
		return switches;
	}

	public List getTasks()
	{
		return tasks;
	}

	public List getLists()
	{
		return lists;
	}

	public LinkedHashMap getDataSources()
	{
		return dataSources;
	}

	public LinkedHashMap getCodec()
	{
		return codec;
	}

	public LinkedHashMap getFactorys()
	{
		return factorys;
	}

	public LinkedHashMap getCaches()
	{
		return caches;
	}

	public LinkedHashMap getAppendNodes()
	{
		return appendNodes;
	}

	public MonitorJson getMonitor()
	{
		return monitor;
	}
}



