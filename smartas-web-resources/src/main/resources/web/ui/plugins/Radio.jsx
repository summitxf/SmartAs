+ function(Namespace) {
	var UI = Namespace.register("Smart.UI"),
		AT = Smart.UI.ActionTypes;
	UI.Radio = React.createClass({
		propTypes: {
			name: React.PropTypes.string.isRequired,
			id: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			readonly: React.PropTypes.bool,
			checked: React.PropTypes.bool,
			uncheckable: React.PropTypes.bool,
			action: React.PropTypes.func,
			value: React.PropTypes.string.isRequired
		},
		//返回底层的dom节点
		getDom: function() {
			return this.refs.input;
		},

		getDefaultProps: function() {
			return {
				disabled: false,
				uncheckable: false,
				readonly: false,
				checked: false,
				action: function() {}
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
			//event.preventDefault();
			//event.stopPropagation();
			if (disabled) {
				return;
			}
			//选中框支持取消选中
			var checked = this.state.checked
			if (!this.props.uncheckable && checked) {
				return;
			}
			var opts = {
				checked: !checked
			};
			this.setState(opts);
			this.props.action({
				type: AT.F.INPUT_CHANGE
				ops: {
					type: 'radio',
					checked: !checked,
					name: this.props.name,
					value: this.props.value
				}
			});
		},

		componentWillReceiveProps: function(nextProps) {
			this.state.checked = nextProps.checked
		},

		render: function() {
			var disabled = this.props.disabled || this.props.readonly,
				checked = this.state.checked,
				p = this.props,
				s = this.state;
			return <div onMouseEnter={this.doMouseEnter} onMouseLeave={this.doMouseLeave}  className={classNames('l-radio-wrapper',{'l-disabled':disabled,'l-over':s.mouseOver})}>
				<a onClick={this.doClick.bind(this,disabled,p.name)} className={classNames('l-radio',{'l-radio-checked':checked})}/>
				<input ref='input' type="radio" name={p.name} id={p.id} style={{display:'none'}}  readOnly={disabled} checked={checked} value={p.value}/>
			</div>;
		}
	});
}(Smart.Namespace)