package org.smartas.core;

import java.io.Serializable;
import java.util.Collection;

/**
 * 
 * @author chenb
 *
 */
public class Pageable<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -410571025796786344L;

	private int pageSize;

	private int page; //

	private Collection<T> data; //

	private int length; //
	
	public Pageable() {
	}

	public Pageable(int page, int pageSize, int length, Collection<T> data) {
		this.page = page;
		this.pageSize = pageSize;
		this.length = length;
		this.data = data;
	}

	public Collection<T> getData() {
		return data;
	}

	public int getLength() {
		return length;
	}

	public int getPage() {
		return page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setData(Collection<T> data) {
		this.data = data;
	}

	public void setLength(int length) {
		this.length = length;
	}
}