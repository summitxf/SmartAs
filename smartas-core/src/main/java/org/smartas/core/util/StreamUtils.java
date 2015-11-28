package org.smartas.core.util;

import java.io.Closeable;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author chenb
 *
 */
public abstract class StreamUtils {
	
	private static Logger logger = LoggerFactory.getLogger(StreamUtils.class);
	
	public static void close(Closeable ...ins){
		for (Closeable in : ins) {
			try {
				in.close();
			} catch (IOException e) {
				logger.warn(e.getMessage(), e);;
			}
		}
	}
}