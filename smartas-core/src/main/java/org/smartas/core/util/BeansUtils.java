package org.smartas.core.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.AnnotationAwareOrderComparator;

/**
 * @author chenb
 *
 */
public abstract class BeansUtils {

	//private static Logger logger = LoggerFactory.getLogger(BeansUtils.class);

	public static <T> List<T> getBeansOfType(ApplicationContext context, Class<T> type) throws BeansException {
		List<T> beans = new ArrayList<T>(context.getBeansOfType(type).values());
		AnnotationAwareOrderComparator.sort(beans);
		return beans;
	}

}