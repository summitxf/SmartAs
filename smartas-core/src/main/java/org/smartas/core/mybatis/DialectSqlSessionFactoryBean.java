package org.smartas.core.mybatis;

import java.util.Properties;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.util.CollectionUtils;

public class DialectSqlSessionFactoryBean extends SqlSessionFactoryBean {

	private Properties localProperties;

	private DataSource dataSource;

	/**
	 * @return the localProperties
	 */
	public Properties getLocalProperties() {
		return localProperties;
	}

	/**
	 * @param localProperties
	 *            the localProperties to set
	 */
	public void setLocalProperties(Properties localProperties) {
		this.localProperties = localProperties;
	}

	/**
	 * @param dataSource
	 *            the dataSource to set
	 */
	public void setDataSource(DataSource dataSource) {
		super.setDataSource(dataSource);
		this.dataSource = dataSource;
	}

	public void setConfigurationProperties(Properties sqlSessionFactoryProperties) {
		this.localProperties = sqlSessionFactoryProperties;
	}

	public void afterPropertiesSet() throws Exception {
		Properties properties = new Properties();
		String databaseType = getDatabaseIdProvider().getDatabaseId(dataSource);
		if (localProperties != null) {
			CollectionUtils.mergePropertiesIntoMap(localProperties, properties);
		}
		properties.put("limitBefore", DialectUtil.getLimitBefore(databaseType));
		properties.put("limitAfter", DialectUtil.getLimitAfter(databaseType));
		super.setConfigurationProperties(properties);
		super.afterPropertiesSet();
	}
}