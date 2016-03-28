import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import _ from 'lodash'
import $ from 'jquery'
import './index.scss'

export default class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFlexTextarea: false,
            value: this.props.value,
            icon: this.props.icon
        }
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        if (this.props.flexWidth || this.props.flexHeight) {
            this.forceUpdate()
            setTimeout(()=> {
                this.$dom.find('#j-flex-textarea').show()
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }

    handleFocus(event) {
        this.props.onFocus(event.target.value, event)
    }

    handleBlur(event) {
        this.props.onBlur(event.target.value, event)
    }

    handleFlexTextareaFocus(event) {
        this.props.onFocus(event.target.value, event)
        this.setState({
            showFlexTextarea: true
        })
    }

    handleFlexTextareaBlur(event) {
        this.props.onBlur(event.target.value, event)
        this.setState({
            showFlexTextarea: false
        })
    }

    handleChange(event) {
        this.props.onChange(event.target.value, event)
        let value = event.target.value;

        this.setState({
            value: value
        })
    }

    handleKeyDown(event) {
        this.props.onKeyDown(event)
    }

    handleIconMouseEnter(event) {
        this.setState({
            icon: 'times'
        })
    }

    handleIconMouseLeave() {
        this.setState({
            icon: this.props.icon
        })
    }

    clear() {
        this.setState({
            value: ''
        })
    }

    render() {
        const {className, resize, width, height, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        let textStyle = {
            height: height,
            resize: resize ? null : 'none'
        }

        if (width) {
            textStyle.width = width
        } 

        let mergedInputStyle = Object.assign(_.cloneDeep(this.props.styles.input), textStyle)
        let mergedStyle = Object.assign(_.cloneDeep(this.props.style), textStyle)

        let iconClass = classNames({
            'fa': true,
            ['fa-' + this.state.icon]: true,
            'icon': true
        })

        let childs = (
            <input type="text"
                   id="j-input"
                   value={this.state.value}
                   defaultValue={this.props.defaultValue}
                   className="form-control input"
                   onFocus={this.handleFocus.bind(this)}
                   onBlur={this.handleBlur.bind(this)}
                   onChange={this.handleChange.bind(this)}
                   onKeyDown={this.handleKeyDown.bind(this)}
                   disabled={this.props.disabled}
                   placeholder={this.props.placeholder}
                   autoComplete={this.props.autocomplete?'on':'off'}
                   style={mergedInputStyle}/>
        )

        if (this.props.textarea) {
            childs = (
                <textarea
                    id="j-input"
                    value={this.state.value}
                    defaultValue={this.props.defaultValue}
                    className="form-control input"
                    autoComplete={this.props.autocomplete?'on':'off'}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    style={mergedInputStyle}/>
            )
        }

        let flexTextareaStyle = {
            width: this.state.showFlexTextarea ? this.props.flexWidth || width || this.$dom && this.$dom.find('#j-input').outerWidth() || 200 : this.$dom && this.$dom.find('#j-input').outerWidth(),
            height: this.state.showFlexTextarea ? this.props.flexHeight || 120 : this.$dom && this.$dom.find('#j-input').outerHeight() || 0
        }

        let flexTextareaClass = classNames({
            'flex-textarea': true,
            'input': true
        })

        let flexChild = (
            <textarea id="j-flex-textarea"
                      className={flexTextareaClass}
                      value={this.state.value}
                      defaultValue={this.props.defaultValue}
                      onFocus={this.handleFlexTextareaFocus.bind(this)}
                      onBlur={this.handleFlexTextareaBlur.bind(this)}
                      autoComplete={this.props.autocomplete?'on':'off'}
                      onChange={this.handleChange.bind(this)}
                      onKeyDown={this.handleKeyDown.bind(this)}
                      disabled={this.props.disabled}
                      placeholder={this.props.placeholder}
                      style={flexTextareaStyle}/>
        )

        if (!_.isEmpty(this.props.label)) {
            childs = (
                <div className="form-container">
                    <label style={{width:this.props.labelWidth||null}}
                           className="input-label">{this.props.label}</label>
                    <div style={{position:'relative'}}>
                        {childs}
                        {this.state.icon ? <i className={iconClass}/> : null}
                        {this.props.flexHeight || this.props.flexWidth ?
                            flexChild : null
                        }
                        {this.props.inputEndRender ? this.props.inputEndRender() : null}
                    </div>
                </div>
            )
        }

        if ((!_.isEmpty(this.props.addonLeft) || !_.isEmpty(this.props.addonRight)) && _.isEmpty(this.props.label)) {
            childs = (
                <form className="form-inline">
                    <div className="form-group">
                        <div className="input-group">
                            {_.isEmpty(this.props.addonLeft) ? null :
                                <div className="input-group-addon">{this.props.addonLeft}</div>}
                            <div style={{position:'relative'}}>
                                {childs}
                                {this.state.icon ? <i className={iconClass}/> : null}
                                {this.props.flexHeight || this.props.flexWidth ?
                                    flexChild : null
                                }
                                {this.props.inputEndRender ? this.props.inputEndRender() : null}
                            </div>
                            {_.isEmpty(this.props.addonRight) ? null :
                                <div className="input-group-addon">{this.props.addonRight}</div>}
                        </div>
                    </div>
                </form>
            )
        }

        return (
            <div style={mergedStyle}
                 className={classes}>
                {childs}
                {(this.props.flexHeight || this.props.flexWidth) && _.isEmpty(this.props.label) && _.isEmpty(this.props.addonLeft) && _.isEmpty(this.props.addonRight) ?
                    flexChild : null
                }
                {this.state.icon && _.isEmpty(this.props.label) && _.isEmpty(this.props.addonLeft) && _.isEmpty(this.props.addonRight) ?
                    <i onMouseEnter={this.handleIconMouseEnter.bind(this)}
                       onClick={this.props.handleIconClick}
                       onMouseLeave={this.handleIconMouseLeave.bind(this)}
                       className={iconClass}/> : null}
                {this.props.inputEndRender && _.isEmpty(this.props.label) && _.isEmpty(this.props.addonLeft) && _.isEmpty(this.props.addonRight) ? this.props.inputEndRender() : null}
            </div>
        )
    }
}

Input.defaultProps = {
    style: {},

    styles: {
        input: {}
    },

    // @desc 输入内容的回调
    onChange: ()=> {
    },

    // @desc 获取焦点的回调
    onFocus: ()=> {
    },

    // @desc 取消焦点的回调
    onBlur: ()=> {
    },

    // @desc 按下按键的回调
    onKeyDown: ()=> {
    },

    // @desc 是否禁用
    disabled: false,

    // @desc 宽度
    width: null,

    // @desc 占位文字
    placeholder: '',

    // @desc 是否为 textarea
    textarea: false,

    // @desc 是否允许拖拽大小
    resize: false,

    // @desc 自动缩放宽度
    flexWidth: null,

    // #desc 自动缩放高度
    flexHeight: null,

    // @desc 输入框后面的小图标
    icon: null,

    // @desc 输入框尾部后追加内容
    inputEndRender: null,

    // @desc 是否允许自动填充
    autocomplete: true
}
