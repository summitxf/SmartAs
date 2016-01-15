+ function(Namespace) {
	var UI = Namespace.register("Smart.UI");
	UI.Button = React.createClass({
		propTypes: {
			name: React.PropTypes.string,
			id: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			value: React.PropTypes.string
		},

		getDefaultProps: function() {
			return {
				disabled: false,
			};
		},

		getInitialState: function() {
			return {
				mouseOver: false
			};
		},

		doMouseEnter: function() {
			this.setState({
				mouseOver: true
			})
		},
		doMouseLeave: function() {
			this.setState({
				mouseOver: false
			})
		},
		doClick: function(disabled, event) {
			if (disabled) {
				//event.stopPropagation();
				return;
			}
			this.props.onClick && this.props.onClick(event)
		},

		render: function() {
			var p = this.props,	s = this.state;
			return <div onClick={this.doClick.bind(this,p.disabled)} onMouseEnter={this.doMouseEnter} onMouseLeave={this.doMouseLeave}  className={classNames('l-button l-button-hasicon',{'l-button-disabled':p.disabled,'l-button-over':s.mouseOver})}>
				<div className="l-button-l"></div><div className="l-button-r"></div><span>{p.value}</span>
			</div>;
		}
	});
}(Smart.Namespace)