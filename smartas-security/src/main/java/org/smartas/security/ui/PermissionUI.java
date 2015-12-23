/**
 * 
 */
package org.smartas.security.ui;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.security.model.Permission;
import org.smartas.security.service.PermissionService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.ReflectionUtils.MethodCallback;
import org.springframework.util.ReflectionUtils.MethodFilter;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author chenb
 *
 */
@RestController()
@RequestMapping("/security/permission")
@Resource(code = 1003, model = "Smart", desc = "PermissionUI UI")
public class PermissionUI extends BaseUI<Permission> implements InitializingBean {
	@Autowired
	private PermissionService service;
	@Autowired
	private ApplicationContext applicationContext;

	private List<Permission> perms;

	protected PermissionService getService() {
		return service;
	}

	public void afterPropertiesSet() throws Exception {
		Map<String, Object> beans = applicationContext.getBeansWithAnnotation(Resource.class);
		final Set<Permission> perms = new HashSet<Permission>();
		for (Object bean : beans.values()) {
			Class<?> clazz = bean.getClass();
			final Resource resource = AnnotationUtils.getAnnotation(clazz, Resource.class);

			Permission perm = new Permission();
			perm.setId(resource.model());
			perm.setDesc(resource.model());
			perms.add(perm);

			perm = new Permission();
			perm.setId(String.valueOf(resource.code()));
			perm.setParentId(resource.model());
			perm.setDesc(resource.desc());
			perms.add(perm);
			ReflectionUtils.doWithMethods(clazz, new MethodCallback() {
				public void doWith(Method method) throws IllegalArgumentException, IllegalAccessException {
					Operation operation = AnnotationUtils.findAnnotation(method, Operation.class);
					Permission perm = new Permission();
					perm.setId(resource.code() + "." + operation.code());
					perm.setParentId(String.valueOf(resource.code()));
					perm.setDesc(operation.desc());
					perms.add(perm);
				}
			}, OPERATION_HANDLER_METHODS);
		}
		this.perms = new ArrayList<Permission>(perms);
		Collections.sort(this.perms, new Comparator<Permission>() {
			public int compare(Permission o1, Permission o2) {
				return o1.getId().compareTo(o2.getId());
			}
		});
	}

	@RequestMapping(value = "/scan", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<Permission> scan() {
		return perms;
	}

	public static final MethodFilter OPERATION_HANDLER_METHODS = new MethodFilter() {
		public boolean matches(Method method) {
			return (AnnotationUtils.findAnnotation(method, Operation.class) != null);
		}
	};

	@RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
	@Operation(code = 3002, desc = "Role Permissions")
	public String[] getPermissions(@PathVariable("id") long id) {
		return service.getPermissionsByRoleId(id);
	}

	@RequestMapping(value = "/role/{id}", method = RequestMethod.POST)
	@Operation(code = 3002, desc = "Role Permissions")
	public void savePermissions(@PathVariable("id") long roleId, @RequestBody String[] ids) {
		service.updatePermissions(roleId, ids);
	}

}
