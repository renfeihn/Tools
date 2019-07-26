package cn.com.agree.aweb.websocket;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import javax.websocket.CloseReason;
import javax.websocket.CloseReason.CloseCodes;

import org.junit.Test;

public class WebSocketPushService {
	
	public static void asyncPushToAllClients(String jsonData){
		asyncPushToAllClients(jsonData, null);
	}
	public static void asyncPushToAllClients(String jsonData, Collection<String> names) {
		List<WSClient> clients = null;
		if(names == null){
			clients = WebSocketClientPool.getAllClients();
		}else{
			clients = WebSocketClientPool.getClinetsByNames(names);
		}
		
		for(WSClient client : clients){
			if(client.getSession().isOpen()){
				client.getSession().getAsyncRemote().sendText(jsonData);
			}
		}
		
	}
	public static void syncPushToAllClients(String jsonData) throws IOException{
		syncPushToAllClients(jsonData, null);
	}
	public static void syncPushToAllClients(String jsonData, Collection<String> names) throws IOException {
		List<WSClient> clients = null;
		if(names == null){
			clients = WebSocketClientPool.getAllClients();
		}else{
			clients = WebSocketClientPool.getClinetsByNames(names);
		}
		
		for(WSClient client : clients){
			if(client.getSession().isOpen()){
				client.getSession().getBasicRemote().sendText(jsonData);
			}
		}
	}
	
	public static void closeClients() throws IOException{
		closeClients(null);
	}
	
	public static void closeClients(Collection<String> names) throws IOException {
		List<WSClient> clients = null;
		if(names == null){
			clients = WebSocketClientPool.getAllClients();
		}else{
			clients = WebSocketClientPool.getClinetsByNames(names);
		}
		
		for(WSClient client : clients){
			CloseReason reason = new CloseReason(CloseCodes.NORMAL_CLOSURE, "服务器关闭连接");
			if(client.getSession().isOpen()){
				client.getSession().close(reason);
			}
		}
	}
	@Test
	public void testPushService(){
		asyncPushToAllClients("{'test':'testmessage'}");
	}
	
}
