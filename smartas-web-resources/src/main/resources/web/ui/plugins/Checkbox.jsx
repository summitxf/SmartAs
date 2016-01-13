+ function(Namespace) {
	var UI = Namespace.register("Smart.UI");
	UI.Checkbox = React.createClass({
		propTypes: {
			name: React.PropTypes.string.isRequired,
			id: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			readonly: React.PropTypes.bool,
			checked: React.PropTypes.bool,
			value: React.PropTypes.string
		},

		getDefaultProps: function() {
			return {
				disabled: false,
				readonly: false,
				checked: false
			};
		},

		getInitialState: function() {
			return {
				checked: this.props.checked || false,
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
		doClick: function(disabled, name, event) {
			if (disabled) {
				return;
			}
			var opts = {};
			opts.checked = !this.state.checked
			this.setState(opts)
		},

		componentWillReceiveProps: function(nextProps) {
			this.state.checked = nextProps.checked
		},

		render: function() {
			var disabled = this.props.disabled || this.props.readonly,
				checked = this.state.checked,
				p = this.props,
				s = this.state;
			return <div onMouseEnter={this.doMouseEnter} onMouseLeave={this.doMouseLeave}  className={classNames('l-checkbox-wrapper',{'l-disabled':disabled,'l-over':s.mouseOver})}>
				<a onClick={this.doClick.bind(this,disabled,p.name)} className={classNames('l-checkbox',{'l-checkbox-checked':checked})}/>
				<input type="checkbox" name={p.name} id={p.id} style={{display:'none'}} disabled={disabled} checked={checked} value={p.value}/>
			</div>;
		}
	});
}(Smart.Namespace)