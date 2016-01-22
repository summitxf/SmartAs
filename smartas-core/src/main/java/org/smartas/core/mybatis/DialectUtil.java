/**
 * 
 */
package org.smartas.core.mybatis;

import java.util.HashMap;
import java.util.Map;

/**
 * @author chenb
 *
 */
public class DialectUtil {

	private static final Map<String, String> limitBeforeStatements = new HashMap<String, String>();
	private static final Map<String, String> limitAfterStatements = new HashMap<String, String>();

	static {
		// h2
		limitBeforeStatements.put("h2", "");
		limitAfterStatements.put("h2", " LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// hsql
		limitBeforeStatements.put("hsql", "");
		limitAfterStatements.put("hsql", " LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// mysql specific
		limitBeforeStatements.put("mysql", "");
		limitAfterStatements.put("mysql", " LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// postgres specific
		limitBeforeStatements.put("postgres", "");
		limitAfterStatements.put("postgres", " LIMIT #{page.maxResult} OFFSET #{page.firstResult}");

		// oracle
		limitBeforeStatements.put("oracle", "select * from ( select a.*, ROWNUM rnum from ( ");
		limitAfterStatements.put("oracle", "  ) a where ROWNUM < #{page.lastRow}) where rnum  >= #{page.firstRow}");

		// db2
		limitBeforeStatements.put("db2", "SELECT SUB.* FROM ( ");
		limitAfterStatements.put("db2", " )RES ) SUB WHERE SUB.rnk >= #{page.firstRow} AND SUB.rnk < #{page.lastRow}");

		// mssql
		limitBeforeStatements.put("mssql", "SELECT SUB.* FROM ( ");
		limitAfterStatements.put("mssql", " )RES ) SUB WHERE SUB.rnk >= #{page.firstRow} AND SUB.rnk < #{page.lastRow}");
	}

	public static String getLimitBefore(String databaseId) {
		return limitBeforeStatements.get(databaseId);
	}

	public static String getLimitAfter(String databaseId) {
		return limitAfterStatements.get(databaseId);
	}

}
