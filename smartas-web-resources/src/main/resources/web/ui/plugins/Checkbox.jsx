+ function(Namespace) {
	var UI = Namespace.register("Smart.UI");
	UI.Checkbox = React.createClass({
		propTypes: {
			name: React.PropTypes.string,
			id: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			readOnly: React.PropTypes.bool,
			checked: React.PropTypes.bool,
			value: React.PropTypes.string
		},

		getDefaultProps: function() {
			return {
				disabled: false,
				readOnly: false,
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
			//选中框支持取消选中
			var checked = this.checked
			var checkedLink = this.props.checkedLink;
			if (checkedLink) {
				checkedLink.requestChange(this.props.value,!checked,'checkbox');
			} else {
				this.setState({
					checked: !checked
				});
			}
		},

		render: function() {
			var p = this.props,	s = this.state,
			disabled = p.disabled || p.readOnly,
			checked;
			if(p.checkedLink){
				checked = p.checkedLink.value === p.value;
			}else{
				checked = s.checked || p.checked;
			}
			this.checked = checked;
			return <div onMouseEnter={this.doMouseEnter} onMouseLeave={this.doMouseLeave}  className={classNames('l-checkbox-wrapper',{'l-disabled':disabled,'l-over':s.mouseOver})}>
				<a onClick={this.doClick.bind(this,disabled,p.name)} className={classNames('l-checkbox',{'l-checkbox-checked':checked})}/>
				<input type="checkbox" name={p.name} id={p.id} style={{display:'none'}} readOnly={disabled} checked={checked} value={p.value}/>
			</div>;
		}
	});
}(Smart.Namespace)