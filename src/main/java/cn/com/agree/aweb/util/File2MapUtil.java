package cn.com.agree.aweb.util;import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class File2MapUtil {
     //将List<Map<String,Object>> 类型的数据通过文件做 字段映射
	public List<Map<String,Object>> colunmMap(String fileName,List<Map<String,Object>> sourceResult) throws IOException{
	if(sourceResult==null){
		return null;
	}
	Map<String,Map<String,String>> fileMap=fileToMap(fileName);
   	 for(Map<String,Object> map:sourceResult){
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
	return sourceResult;
	}
	public static Map<String,Map<String,String>> fileToMap(String resultSet) throws IOException {
   	 Map<String,Map<String,String>> fileMap=new HashMap<String,Map<String,String>>();
   	 Set<String> colunmKey=new HashSet<String>();
   	 File file=new File(resultSet);
   	 if(!file.exists()){
   		 return fileMap;
   	 }
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
