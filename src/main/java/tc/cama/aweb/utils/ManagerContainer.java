package tc.cama.aweb.utils;


import cn.com.agree.afa.core.scoreboard.DeviceState;
import cn.com.agree.afa.omi.ConfigFile;
import cn.com.agree.afa.omi.IOperationsManager;
import cn.com.agree.afa.omi.ManagerFactory;
import cn.com.agree.afa.omi.OmiException;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ManagerContainer
{
  private static final Logger log = LoggerFactory.getLogger(ManagerContainer.class);
  private Map<String, IOperationsManager> managers = new LinkedHashMap();
  
  public IOperationsManager getManager(String host, int port)
    throws OmiException
  {
    String key = generateIdentity(host, port);
    
    IOperationsManager manager = (IOperationsManager)this.managers.get(key);
    if (manager == null) {
      try
      {
        manager = ManagerFactory.createManager(host, port);
        synchronized (this.managers)
        {
          this.managers.put(key, manager);
        }
      }
      catch (OmiException e)
      {
        //log.error(String.format("实例异常", new Object[] { key }), e);
        //throw new OmiException(String.format("实例异常", new Object[] { key }));
      }
    }
    return manager;
  }
  
  public synchronized IOperationsManager getExistsManager(String host, int port)
  {
    String key = generateIdentity(host, port);
    IOperationsManager manager = (IOperationsManager)this.managers.get(key);
    return manager;
  }
  
  public synchronized void removeManger(String host, int port)
  {
    String key = generateIdentity(host, port);
    IOperationsManager manager = (IOperationsManager)this.managers.get(key);
    if (manager != null)
    {
      ManagerFactory.destroyManager(manager);
      this.managers.remove(key);
    }
  }
  
  public synchronized DeviceState getManagerState(String host, int port)
  {
    IOperationsManager manager = (IOperationsManager)this.managers.get(generateIdentity(host, port));
    if (manager == null) {
      return DeviceState.Stopped;
    }
    try
    {
      ConfigFile config = manager.getConfigFile();
      if (config == null) {
        return DeviceState.Stopped;
      }
    }
    catch (Exception e)
    {
      return DeviceState.Stopped;
    }
    return DeviceState.Running;
  }
  
  public void stopManager(String host, int port, boolean isStop)
    throws OmiException
  {
    String key = generateIdentity(host, port);
    IOperationsManager manager = (IOperationsManager)this.managers.get(key);
    if (manager != null)
    {
      if (isStop) {
        manager.stopPlatform();
      }
      ManagerFactory.destroyManager(manager);
      this.managers.remove(key);
    }
  }
  
  public synchronized int managerSize()
  {
    return this.managers.size();
  }
  
  private String generateIdentity(String host, int port)
  {
    return host + ":" + port;
  }
  
  public synchronized void destroy()
  {
    Iterator<IOperationsManager> iterator = this.managers.values().iterator();
    while (iterator.hasNext()) {
      ManagerFactory.destroyManager((IOperationsManager)iterator.next());
    }
    this.managers = null;
  }
  
  public Map<String, IOperationsManager> getManagers()
  {
    return this.managers;
  }
}