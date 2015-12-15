package org.smartas.core.sql.scripting.xmltags;

import org.apache.ibatis.scripting.xmltags.DynamicContext;
import org.apache.ibatis.scripting.xmltags.SqlNode;

public class QuerySqlNode implements SqlNode {

	private String open;
	private String close;
	private String expression;

	public QuerySqlNode(String open, String close, String exp) {
		this.open = open;
		this.close = close;
		this.expression = exp;
	}

	public boolean apply(DynamicContext context) {
		System.out.println(open + expression + close);
		return true;
	}

}