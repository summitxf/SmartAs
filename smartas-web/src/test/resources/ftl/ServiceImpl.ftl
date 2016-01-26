package ${pkg}.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import ${pkg}.${name};
import ${pkg}.dao.${name}Dao;
import ${pkg}.service.${name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ftl
 *
 */
@Service
public class ${name}ServiceImpl extends BaseServiceImpl<${name}> implements ${name}Service {

	@Autowired
	private ${name}Dao dao;

	protected ${name}Dao getDao() {
		return dao;
	}
	
	////

}
