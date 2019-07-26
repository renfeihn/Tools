package cn.com.agree;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.aim.alibaba.fastjson.JSON;

public class readFile {
     public static void main(String[] args) throws IOException{
    	 //待处理结果集
    	 List<Map<String,Object>> dataResult=new ArrayList<Map<String,Object>>();
    	 Map<String,Object> map1=new HashMap<String,Object>();
    	 Map<String,Object> map2=new HashMap<String,Object>();
    	 Map<String,Object> map3=new HashMap<String,Object>();
    	 map1.put("id", "1");
    	 map1.put("block", "1");
    	 map1.put("health_state", "0");
    	 map1.put("run_state", "22");
    	 
    	 map2.put("id", "2");
    	 map2.put("block", "2");
    	 map2.put("health_state", "1");
    	 map2.put("run_state", "30");
    	 
    	 map3.put("id", "3");
    	 map3.put("block", "3");
    	 map3.put("health_state", "2");
    	 map3.put("run_state", "50");
    	 dataResult.add(map1);
    	 dataResult.add(map2);
    	 dataResult.add(map3);
    	String resultSet="d://oceanstore5600_controlinfo.txt";
    	Map<String,Map<String,String>> fileMap=fileToMap(resultSet);
    	 for(Map<String,Object> map:dataResult){
    		 Set<String> keySet=map.keySet();
    		 if(keySet!=null&&keySet.size()>0){
    			for(String key:keySet){
    				Map<String,String> colunmMap=fileMap.get(key);
    				if(colunmMap!=null){
    					String sourceValue=map.get(key)+"";
    					String targetValue=colunmMap.get(sourceValue);
    					if(targetValue!=null){
    						map.put(key, targetValue);
    					}
    				}
    			}
    		 }
    	 }
     }
     public static Map<String,Map<String,String>> fileToMap(String resultSet) throws IOException {
    	 Map<String,Map<String,String>> fileMap=new HashMap<String,Map<String,String>>();
    	 Set<String> colunmKey=new HashSet<String>();
    	 File file=new File(resultSet);
    	 FileReader fr=new FileReader(file);
		 BufferedReader br=new BufferedReader(fr);
    	 String lineString= br.readLine();
    	 while(lineString!=null){
    		 String [] items=lineString.split("	");
    		 //System.out.println(lineString);
    		 if(items.length==3){
    			 if(!colunmKey.contains(items[0])){
    				 Map<String,String> itemMap=new HashMap<String,String>();
    				 colunmKey.add(items[0]); 
    				 fileMap.put(items[0], itemMap);
    				 fileMap.get(items[0]).put(items[1], items[2]);
    			 }else{
    				 fileMap.get(items[0]).put(items[1], items[2]);
    			 }
    		 }
    		 lineString=br.readLine();
    	 }
    	 fr.close();
    	 br.close();
    	 return fileMap;
     }
}
