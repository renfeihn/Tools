package tc.cama.aweb.bean;

public class Menu {
	private int mid;
	private Integer pid;
	private String path;
	private String name;
	private String iconPath;

	public Menu() {
	}

	public Menu(Integer pid, int mid, String name, String path, String iconPath) {
		super();
		this.pid = pid;
		this.mid = mid;
		this.path = path;
		this.name = name;
		this.iconPath = iconPath;
	}

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIconPath() {
		return iconPath;
	}

	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}

}
