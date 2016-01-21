+function(Namespace,Service) {
	var UI = Namespace.register("Smart.UI"), AT = Smart.UI.ActionTypes;
	UI.Storage = React.createClass({
		propTypes : {
			model : React.PropTypes.string.isRequired,
		},
		shouldComponentUpdate : function(nextProps, nextState) {
			var should = nextProps.model !== this.props.model;
			if (should) {
				this.tryUnsubscribe();
			}
			return should;
		},
		getService:function(){
			return this.service;
		},
		handleChange : function(action) {
			//提交数据到中央存储？？
		},
		trySubscribe : function() {
			if (!this.unsubscribe) {
				this.unsubscribe = this.service.subscribe(this.handleChange);
			}
		},

		tryUnsubscribe : function() {
			if (this.unsubscribe) {
				this.unsubscribe();
				this.unsubscribe = null;
			}
		},
		componentDidMount : function() {
			this.trySubscribe();
		},
		componentWillUnmount : function() {
			this.tryUnsubscribe();
			this.service = null;
		},
		render : function() {
			this.service = Service.New(this.props.model);
			return React.cloneElement(React.Children.only(this.props.children), {
				service : this.service
			});
		}
	});
}(Smart.Namespace,Smart.Service)