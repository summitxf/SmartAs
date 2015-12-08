/**
 * 
 */
package org.smartas.security.model;

import org.smartas.core.BaseEntity;

/**
 * 菜单对下
 * 
 * @author chenb
 *
 */
public class Menu extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5732101265834007723L;

	private String code;

	private String name;

	private String url;

	private Long parentId;

	// 排序号
	private int sn;

	// 样式控制
	private String className;
	private String iconName;
	
	/**
	 * 是否发布
	 */
	private boolean publish;

	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code
	 *            the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url
	 *            the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * @return the parentId
	 */
	public Long getParentId() {
		return parentId;
	}

	/**
	 * @param parentId
	 *            the parentId to set
	 */
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	/**
	 * @return the className
	 */
	public String getClassName() {
		return className;
	}

	/**
	 * @param className
	 *            the className to set
	 */
	public void setClassName(String className) {
		this.className = className;
	}

	/**
	 * @return the iconName
	 */
	public String getIconName() {
		return iconName;
	}

	/**
	 * @param iconName
	 *            the iconName to set
	 */
	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	/**
	 * @return the sn
	 */
	public int getSn() {
		return sn;
	}

	/**
	 * @param sn the sn to set
	 */
	public void setSn(int sn) {
		this.sn = sn;
	}

	/**
	 * @return the publish
	 */
	public boolean isPublish() {
		return publish;
	}

	/**
	 * @param publish the publish to set
	 */
	public void setPublish(boolean publish) {
		this.publish = publish;
	}
	
}
