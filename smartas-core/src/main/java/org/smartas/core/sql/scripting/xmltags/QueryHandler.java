package org.smartas.core.sql.scripting.xmltags;

import java.util.List;

import org.apache.ibatis.parsing.XNode;
import org.apache.ibatis.scripting.xmltags.SqlNode;
import org.smartas.core.sql.scripting.XMLScriptBuilder.NodeHandler;

public class QueryHandler implements NodeHandler {
	public void handleNode(XNode nodeToHandle, List<SqlNode> targetContents) {
		String open = nodeToHandle.getStringAttribute("open");
		String close = nodeToHandle.getStringAttribute("close");
		final String expression = nodeToHandle.getStringAttribute("value");
		final QuerySqlNode node = new QuerySqlNode(open, close, expression);
		targetContents.add(node);
	}
}