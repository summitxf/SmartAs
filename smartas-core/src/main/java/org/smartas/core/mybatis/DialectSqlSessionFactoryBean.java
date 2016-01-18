package org.smartas.core.mybatis;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.util.CollectionUtils;

public class DialectSqlSessionFactoryBean extends SqlSessionFactoryBean {
	private static final Map<String, String> limitBeforeStatements = new HashMap<String, String>();
	private static final Map<String, String> limitAfterStatements = new HashMap<String, String>();

	static {
		// h2
		limitBeforeStatements.put("h2", "");
		limitAfterStatements.put("h2", "LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// hsql
		limitBeforeStatements.put("hsql", "");
		limitAfterStatements.put("hsql", "LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// mysql specific
		limitBeforeStatements.put("mysql", "");
		limitAfterStatements.put("mysql", "LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// postgres specific
		limitBeforeStatements.put("postgres", "");
		limitAfterStatements.put("postgres", "LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// oracle
		limitBeforeStatements.put("oracle", "select * from ( select a.*, ROWNUM rnum from (");
		limitAfterStatements.put("oracle", "  ) a where ROWNUM < #{page.lastRow}) where rnum  >= #{page.firstRow}");

		// db2
		limitBeforeStatements.put("db2", "SELECT SUB.* FROM (");
		limitAfterStatements.put("db2", ")RES ) SUB WHERE SUB.rnk >= #{page.firstRow} AND SUB.rnk < #{page.lastRow}");

		// mssql
		limitBeforeStatements.put("mssql", "SELECT SUB.* FROM (");
		limitAfterStatements.put("mssql", ")RES ) SUB WHERE SUB.rnk >= #{page.firstRow} AND SUB.rnk < #{page.lastRow}");
	}

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
		properties.put("limitBefore", limitBeforeStatements.get(databaseType));
		properties.put("limitAfter", limitAfterStatements.get(databaseType));
		super.setConfigurationProperties(properties);
		super.afterPropertiesSet();
	}
}