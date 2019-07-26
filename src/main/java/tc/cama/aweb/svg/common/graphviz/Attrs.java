package tc.cama.aweb.svg.common.graphviz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Attrs {

	Component component;
	private Map<String, Attr> data;

	/**
	 * create attributes to the component.
	 * 
	 */
	public Attrs(Component component) {
		this.component = component;
		this.data = new HashMap<String, Attr>();
	}

	/**
	 * return a attribute of the component.
	 * 
	 */
	public Attr get(String name) {
		Attr attr = this.data.get(name);
		if (attr == null)
			attr = new Attr(this, name);
		return attr;
	}

	/**
	 * create/update the attribute of the list.
	 */
	public void set(String name, Attr attribute) {
		this.data.put(name, attribute);
	}
	
	public void putAll(Map<String,String> attributeMap){
		if(attributeMap==null){
			return;
		}
		for(Map.Entry<String, String> entry:attributeMap.entrySet()){
			get(entry.getKey()).value(entry.getValue());
		}
	}
	
	/**
	 * total of the attributes.
	 * 
	 */
	public int total() {
		return this.data.size();
	}

	/**
	 * remove the attribute of the data.
	 * 
	 */
	public void remove(String name) {
		this.data.remove(name);
	}

	public List<Attr> list() {
		return new ArrayList<Attr>(data.values());
	}
	
	public void put(String name,String value){
		 String arr[][] = new String[][] { {"","" }};
		 for (int i = 0; i < arr.length; i++) {
		 String[] arr2 = arr[i];
		 for (int c = 0; c < arr2.length; c++) {
		 if(c==0){
			arr2[c]=name;
		 }
		 if(c==1){
			arr2[c]=value;
		 }
		
		 }

		 }
	}
	
	
}
