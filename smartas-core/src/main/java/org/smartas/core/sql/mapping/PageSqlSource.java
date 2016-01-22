package org.smartas.core.sql.mapping;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.builder.SqlSourceBuilder;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.scripting.xmltags.DynamicContext;
import org.apache.ibatis.scripting.xmltags.SqlNode;
import org.apache.ibatis.session.Configuration;
import org.smartas.core.mybatis.DialectUtil;

/**
 * @author chenb
 *
 */
public class PageSqlSource implements SqlSource {

	protected final Configuration configuration;
	protected final SqlNode rootSqlNode;
	protected final boolean isDynamic;

	public PageSqlSource(Configuration configuration, SqlNode rootSqlNode, boolean isDynamic) {
		this.configuration = configuration;
		this.rootSqlNode = rootSqlNode;
		this.isDynamic = isDynamic;
	}

	protected String getSql(DynamicContext context) {
		String sql = context.getSql();
		StringBuilder builder = new StringBuilder(sql.length() + 150);
		builder.append(DialectUtil.getLimitBefore(configuration.getDatabaseId()));
		builder.append(sql);
		builder.append(DialectUtil.getLimitAfter(configuration.getDatabaseId()));
		return builder.toString();
	}

	public BoundSql getBoundSql(Object parameterObject) {
		DynamicContext context = new DynamicContext(configuration, isDynamic ? parameterObject : null);
		rootSqlNode.apply(context);
		SqlSourceBuilder sqlSourceParser = new SqlSourceBuilder(configuration);
		Class<?> parameterType = parameterObject == null ? Object.class : parameterObject.getClass();
		SqlSource sqlSource = sqlSourceParser.parse(getSql(context), parameterType,
				isDynamic ? context.getBindings() : new HashMap<String, Object>());
		BoundSql boundSql = sqlSource.getBoundSql(parameterObject);
		if (isDynamic) {
			for (Map.Entry<String, Object> entry : context.getBindings().entrySet()) {
				boundSql.setAdditionalParameter(entry.getKey(), entry.getValue());
			}
		}
		return boundSql;
	}

}
