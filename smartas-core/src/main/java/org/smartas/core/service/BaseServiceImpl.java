package org.smartas.core.service;

import org.smartas.core.BaseService;
import org.smartas.core.POJO;

public abstract class BaseServiceImpl<T extends POJO> extends GenericServiceImpl<T, Long> implements BaseService<T> {

}
