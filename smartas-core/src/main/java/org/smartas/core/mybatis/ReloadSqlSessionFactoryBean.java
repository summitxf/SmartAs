package org.smartas.core.mybatis;

import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.smartas.core.spring.event.MyBaitsRefreshEvent;
import org.springframework.context.ApplicationEvent;

/**
 * 开发环境手动重加载mybatis配置
 * 
 * @author chenb
 *
 */
public class ReloadSqlSessionFactoryBean extends DialectSqlSessionFactoryBean {

	private static final Logger logger = LoggerFactory.getLogger(ReloadSqlSessionFactoryBean.class);

	private SqlSessionFactory nativeSqlSessionFactory;

	private class FactoryInterceptor implements InvocationHandler {
		public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
			return method.invoke(nativeSqlSessionFactory, args);
		}
	}

	@Override
	protected SqlSessionFactory buildSqlSessionFactory() throws IOException {
		nativeSqlSessionFactory = super.buildSqlSessionFactory();
		return (SqlSessionFactory) Proxy.newProxyInstance(SqlSessionFactory.class.getClassLoader(),
				new Class[] { SqlSessionFactory.class }, new FactoryInterceptor());
	}

	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		super.onApplicationEvent(event);
		if (event instanceof MyBaitsRefreshEvent) {
			MyBaitsRefreshEvent myEvent = (MyBaitsRefreshEvent) event;
			try {
				logger.info("strat reload mybatis mapping files");
				SqlSessionFactory realodedSSF = super.buildSqlSessionFactory();
				realodedSSF.getConfiguration().getMappedStatementNames();
				this.nativeSqlSessionFactory = realodedSSF;
				logger.info("end reload mybatis mapping files");
				myEvent.setSucess(true);
			} catch (IOException e) {
				logger.error("reload mybatis mapping fail", e);
				myEvent.setSucess(false);
			}
		}
	}
}
