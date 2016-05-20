import * as React from 'react'
import * as classNames from 'classnames'
import * as module from './module'
import validator from './validate'
import {others} from '../../../../common/transmit-transparently/src'
import './index.scss'

export default class Input extends React.Component<module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    constructor(props: any) {
        super(props)
    }

    handleInputChange(event: any) {
        this.props['onChange'] && this.props['onChange'](event)

        const validateResult = this.props.validateMiddleware(event.target.value, validator)
        this.setState({
            hasError: !validateResult.ok,
            errorMessage: validateResult.errorMessage
        })
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        // 获取焦点时高亮的dom
        let Highlight: React.ReactElement<any> = null
        if (this.props.highlight) {
            Highlight = <span className="highlight"/>
        }

        // 父级 div 的 style 与 input 的保持一致
        // width height
        const propsStyle: any = this.props['style'] || {}
        let rootStyle: any = {
            width: propsStyle.width,
            height: propsStyle.height
        }

        const inputClasses = classNames({
            'input': true,
            'no-label': this.props.label === '',
            [this.props.direction]: true
        })

        const labelClasses = classNames({
            'label': true,
            [this.props.direction]: true
        })

        const bottomBarClasses = classNames({
            'bottom-bar': true,
            'bottom-bar-error': this.state.hasError
        })

        // 错误文字提示
        let ErrorLabel: React.ReactElement<any> = null
        if (this.state.hasError) {
            ErrorLabel = <span className="label-error">{this.state.errorMessage}</span>
        }

        return (
            <div className={classes}
                 style={rootStyle}>
                <input {...others(new module.Props(), this.props) }
                    required={true}
                    onChange={this.handleInputChange.bind(this) }
                    className={inputClasses}/>
                <div className="right-addon">
                    {this.props.rightRender() }
                </div>
                {this.props.innerRender() }
                {Highlight}
                <span className={bottomBarClasses}/>
                <label className={labelClasses}>{this.props.label}{ErrorLabel}</label>
            </div>
        )
    }
}