package tc.bank.common.core;

/**
 * 分页信息
 * 
 * @author xujinwu
 * 
 */
public class Pageable {

	public static final int DEFAULT_PAGE_SIZE = 15;

	/**
	 * 页码，从0开始
	 */
	private int page;
	/**
	 * 每页记录数
	 */
	private int size;
	/**
	 * 起始行
	 */
	private int offset;

	public Pageable() {
		this(0, DEFAULT_PAGE_SIZE);
	}

	public Pageable(int page, int size) {
		this.page = page < 0 ? 0 : page;
		this.size = size < 1 ? DEFAULT_PAGE_SIZE : size;
		this.offset = this.page * this.size;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

}
