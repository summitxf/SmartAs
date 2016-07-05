package org.apache.catalina.loader;

import java.io.File;
import java.io.FileFilter;
import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;

/**
 * @author Martin Kahr
 *
 */
public class DevLoader extends WebappLoader {
	//private static final String info = "org.apache.catalina.loader.DevLoader/2.0"; 
	private static final List<String> IG = new ArrayList<String>();

	static {
		IG.add("servlet-api");
		IG.add("smartas");
	}

	private String webClassPathFile = ".#webclasspath";
	private String projectFile = ".project";

	private static final List<String> EMPTY = Collections.emptyList();

	public DevLoader() {
		super();
	}

	public DevLoader(ClassLoader parent) {
		super(parent);
	}

	/**
	 * @see org.apache.catalina.Lifecycle#start()
	 */
	public void startInternal() throws LifecycleException {
		log("Starting DevLoader");
		//setLoaderClass(DevWebappClassLoader.class.getName());

		super.startInternal();

		ClassLoader cl = super.getClassLoader();
		if (cl instanceof WebappClassLoader == false) {
			logError("Unable to install WebappClassLoader !");
			return;
		}

		File prjDir = getProjectRootDir().getParentFile();

		if (prjDir == null) {
			logError("[" + projectFile + "] file not found");
			return;
		}
		WebappClassLoader devCl = (WebappClassLoader) cl;

		List<String> webClassPathEntries = readWebClassPathEntries();
		//StringBuffer classpath   = new StringBuffer();
		for (String entry : webClassPathEntries) {
			//����jar����
			if (entry.endsWith("*.jar")) {
				loadJar(devCl, prjDir, entry.substring(0, entry.length() - 5));
			} else {
				loadPath(devCl, prjDir, entry);
			}
		}
	}

	private void loadPath(WebappClassLoader devCl, File prjDir, String entry) {
		File f = new File(prjDir, entry);
		//����·��
		if (!f.exists()) {
			f = new File(entry);
			if (!f.exists()) {
				logError(entry + " does not exist !");
			}
			return;
		}

		if (f.isDirectory() && entry.endsWith("/") == false)
			f = new File(f, "/");
		try {
			URL url = f.toURI().toURL();
			devCl.addRepository(url.toString());
			log("added " + url.toString());
		} catch (MalformedURLException e) {
			logError(entry + " invalid (MalformedURL)");
		}
	}

	private boolean ignore(String name) {
		for (String jar : IG) {
			if (name.contains(jar)) {
				return false;
			}
		}
		return true;
	}

	private void loadJar(WebappClassLoader devCl, File prjDir, String entry) {
		//entry = entry.substring(0,entry.length() - 5);
		File f = new File(prjDir, entry);
		//����·��
		if (!f.exists()) {
			f = new File(entry);
			if (!f.exists()) {
				logError(entry + " does not exist !");
				return;
			}
		}

		FileFilter filter = new FileFilter() {
			public boolean accept(File file) {
				return ignore(file.getName()) && file.getName().endsWith(".jar");
			}
		};

		for (File file : f.listFiles(filter)) {
			try {
				URL url = file.toURI().toURL();
				devCl.addRepository(url.toString());
				log("added " + url.toString());
			} catch (MalformedURLException e) {
				logError(file + " invalid (MalformedURL)");
			}
		}
	}

	protected void log(String msg) {
		System.out.println("[DevLoader] " + msg);
	}

	protected void logError(String msg) {
		System.err.println("[DevLoader] Error: " + msg);
	}

	protected List<String> readWebClassPathEntries() {

		File webappDir = getWebappDir();
		log("projectdir=" + webappDir.getAbsolutePath());

		return loadWebClassPathFile(webappDir);
	}

	protected File getProjectRootDir() {
		File rootDir = getWebappDir();

		FileFilter filter = new FileFilter() {
			public boolean accept(File file) {
				return (file.getName().equalsIgnoreCase(projectFile));
			}
		};
		while (rootDir != null) {
			File[] files = rootDir.listFiles(filter);
			if (files != null && files.length >= 1) {
				return files[0].getParentFile();
			}
			rootDir = rootDir.getParentFile();
		}
		return null;
	}

	protected List<String> loadWebClassPathFile(File prjDir) {
		File cpFile = new File(prjDir, webClassPathFile);
		if (!cpFile.exists()) {
			return EMPTY;
		}
		LineNumberReader lr = null;
		try {
			lr = new LineNumberReader(new FileReader(cpFile));
			List<String> rc = new ArrayList<String>();
			String line = null;
			while ((line = lr.readLine()) != null) {
				line = line.trim();
				if (line.length() > 0 && !line.startsWith("#")) {
					line = line.replace('\\', '/');
					rc.add(line);
				}
			}
			return rc;
		} catch (IOException ioEx) {
			return EMPTY;
		} finally {
			if (lr != null) {
				try {
					lr.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	protected ServletContext getServletContext() {
		return ((Context) getContainer()).getServletContext();
	}

	protected File getWebappDir() {
		File webAppDir = new File(getServletContext().getRealPath("/"));
		return webAppDir;
	}
}
