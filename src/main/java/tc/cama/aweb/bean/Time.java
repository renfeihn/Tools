package tc.cama.aweb.bean;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Time implements Comparable<Time> {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Time() {
	};

	public Time(String name) {
		this.name = name;
	};

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Time other = (Time) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	@Override
	public int compareTo(Time time1) {
		//SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		  SimpleDateFormat sdf=new SimpleDateFormat("HH:mm:ss");
		  long l1=0;
		  long l2=0;
		try {
			l1=sdf.parse(this.getName()).getTime();
			l2 = sdf.parse(time1.getName()).getTime();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long  l3=l1-l2;
		int result=0;
		if(l3>0){
			result=1;
		}else if(l3<0){
			result=-1;
		}
		return result;
	}
     
}