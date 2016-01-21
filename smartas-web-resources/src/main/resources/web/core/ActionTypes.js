+function(Namespace) {
	var AT = Namespace.register("Smart.ActionTypes");
	AT.LINK = {
		INPUT_CHANGE : '$$LINK_INPUT_CHANGE'
	}
	AT.SERVICE = {
		SUCCESS : '$$SERVICE_SUCCESS',
		ERROR : '$$SERVICE_ERROR',
		READY : '$$SERVICE_READY',
		REFRESH : '$$SERVICE_REFRESH',
		INIT : '$$SERVICE_INIT',
	}
}(Smart.Namespace);