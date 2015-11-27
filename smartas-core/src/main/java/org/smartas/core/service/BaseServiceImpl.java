package org.smartas.core.service;

import org.smartas.core.BaseService;
import org.smartas.core.Entity;

public abstract class BaseServiceImpl<T extends Entity> extends GenericServiceImpl<T, Long> implements BaseService<T> {

}
