package cn.com.agree.aweb.websocket;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;
/**
 * WebSocket连接池
 * @author Administrator
 *
 */
public class WebSocketClientPool {
	
	/**
	 * String:ClientName
	 * WSClient:ClientInstance
	 */
	public static Map<String, WSClient> clientPool = new HashMap<String, WSClient>();
	public static final int MAX_CLIENTS = 100;
	
	synchronized static void putClient(WSClient client){
		
		if(clientPool.size() == MAX_CLIENTS){
			return;
		}
		
		if(clientPool.containsKey(client.getUsername())){
			return;
		}
		clientPool.put(client.getUsername(), client);
	}
	
	synchronized static void removeClient(String name){
		clientPool.remove(name);
	}
	
	synchronized static void reomveClient(Session session){
		String sessionName = "";
		for(String name : clientPool.keySet()){
			if(clientPool.get(name).getSession() == session){
				sessionName = name;
				break;
			}
		}
		removeClient(sessionName);
	}
	
	public static boolean isConnected(String name){
		return clientPool.containsKey(name);
	}
	
	public static List<WSClient> getAllClients(){
		return new ArrayList<WSClient>(clientPool.values());
	}
	
	public static List<WSClient> getClinetsByNames(Collection<String> names){
		List<WSClient> result = new ArrayList<WSClient>();
		
		for(String name : names){
			WSClient client = clientPool.get(name);
			if(client != null){
				result.add(client);
			}
		}
		return result;
	}
	synchronized static int getCurrentClientsCount(){
		return clientPool.size();
	}
}
