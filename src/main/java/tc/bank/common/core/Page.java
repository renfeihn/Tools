package tc.bank.common.core;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * 分页结果
 * 
 * @author xujinwu
 * 
 * @param <T>
 */
public class Page<T> {

	private long total;
	private Pageable pageable;
	private List<T> content = new ArrayList<T>();

	public Page() {
	}

	public Page(List<T> content, Pageable pageable, long total) {
		this.content.addAll(content);
		this.pageable = pageable;
		this.total = ((!content.isEmpty()) && (pageable != null)
				&& (pageable.getOffset() + pageable.getSize() > total) ? pageable
				.getOffset() + content.size()
				: total);
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public Pageable getPageable() {
		return pageable;
	}

	public void setPageable(Pageable pageable) {
		this.pageable = pageable;
	}

	public List<T> getContent() {
		return new ArrayList<T>(content);
	}

	public void setContent(List<T> content) {
		if (content == null) {
			return;
		}
		this.content.clear();
		this.content.addAll(content);
	}

	public int getSize() {
		return this.pageable == null ? 0 : this.pageable.getSize();
	}

	public long getTotalElements() {
		return this.total;
	}

	public int getTotalPages() {
		return getSize() == 0 ? 1 : (int) Math.ceil(total / getSize());
	}

	@Override
	public String toString() {
		return "Page [total=" + total + ", pageable=" + pageable + ", content="
				+ content + "]";
	}

}
