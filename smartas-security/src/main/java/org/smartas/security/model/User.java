package org.smartas.security.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.smartas.core.BaseEntity;

public class User extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1757475622243875292L;
	protected String username;
	protected String password;
	protected String email;
	protected String position;
	protected String phone;
	protected String mobile;
	protected String fax;
	protected String address;
	protected String zip;
	protected String photo;
	protected Date accessionTime;
	protected Short status;
	protected String education;
	protected Short title;
	protected String fullname;
	
	private Short delFlag;
	
	private Set<String> rights = new HashSet<String>();

	/**
	 * Default Empty Constructor for class AppUser
	 */
	public User() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class AppUser
	 */
	public User(Long in_userId) {
		this.setId(in_userId);
	}


	/**
	 * 	 * @return String
	 * @hibernate.property column="username" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getUsername() {
		return this.username;
	}

	/**
	 * Set the username
	 * @spring.validator type="required"
	 */
	public void setUsername(String aValue) {
		this.username = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="password" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getPassword() {
		return this.password;
	}

	/**
	 * Set the password
	 * @spring.validator type="required"
	 */
	public void setPassword(String aValue) {
		this.password = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="email" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getEmail() {
		return this.email;
	}

	/**
	 * Set the email
	 * @spring.validator type="required"
	 */
	public void setEmail(String aValue) {
		this.email = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="position" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getPosition() {
		return this.position;
	}

	/**
	 * Set the position
	 */
	public void setPosition(String aValue) {
		this.position = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="phone" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getPhone() {
		return this.phone;
	}

	/**
	 * Set the phone
	 */
	public void setPhone(String aValue) {
		this.phone = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="mobile" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getMobile() {
		return this.mobile;
	}

	/**
	 * Set the mobile
	 */
	public void setMobile(String aValue) {
		this.mobile = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="fax" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getFax() {
		return this.fax;
	}

	/**
	 * Set the fax
	 */
	public void setFax(String aValue) {
		this.fax = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="address" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getAddress() {
		return this.address;
	}

	/**
	 * Set the address
	 */
	public void setAddress(String aValue) {
		this.address = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="zip" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getZip() {
		return this.zip;
	}

	/**
	 * Set the zip
	 */
	public void setZip(String aValue) {
		this.zip = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="photo" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getPhoto() {
		return this.photo;
	}

	/**
	 * Set the photo
	 */
	public void setPhoto(String aValue) {
		this.photo = aValue;
	}

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="accessionTime" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getAccessionTime() {
		return this.accessionTime;
	}

	/**
	 * Set the accessionTime
	 * @spring.validator type="required"
	 */
	public void setAccessionTime(java.util.Date aValue) {
		this.accessionTime = aValue;
	}

	/**
	 * 	 * @return Short
	 * @hibernate.property column="status" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}

	/**
	 * Set the status
	 * @spring.validator type="required"
	 */
	public void setStatus(Short aValue) {
		this.status = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="education" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getEducation() {
		return this.education;
	}

	/**
	 * Set the education
	 */
	public void setEducation(String aValue) {
		this.education = aValue;
	}

	/**
	 * 	 * @return Short
	 * @hibernate.property column="title" type="java.lang.Short" length="32" not-null="false" unique="false"
	 */
	public Short getTitle() {
		return this.title;
	}

	/**
	 * Set the title
	 */
	public void setTitle(Short aValue) {
		this.title = aValue;
	}

	/**
	 * 	 * @return String
	 * @hibernate.property column="fullname" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getFullname() {
		return this.fullname;
	}

	/**
	 * Set the fullname
	 */
	public void setFullname(String aValue) {
		this.fullname = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "userId";
	}


	public boolean isAccountNonExpired() {
		return true;
	}

	public boolean isAccountNonLocked() {
		return true;
	}

	public boolean isCredentialsNonExpired() {
		return true;
	}

	public boolean isEnabled() {
		if (status == 1) {
			return true;
		}
		return false;
	}

	//overwrite for 

	public String getBusinessEmail() {
		return email;
	}

	public String getFamilyName() {
		return fullname;
	}

	public String getGivenName() {
		return fullname;
	}

	public Set<String> getRights() {
		return rights;
	}

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}
}
