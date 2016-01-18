package org.smartas.core.mybatis;

import javax.sql.DataSource;

import org.apache.ibatis.mapping.VendorDatabaseIdProvider;

/**
 * @author chenb
 *
 */
public class DefautlDatabaseIdProvider extends VendorDatabaseIdProvider {
	private String cachedDatabaseId;
	public String getDatabaseId(DataSource dataSource) {
		if(cachedDatabaseId == null){
			cachedDatabaseId = super.getDatabaseId(dataSource);
		}
		return cachedDatabaseId;
	}
}
