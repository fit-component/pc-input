import * as React from 'react'
import * as classNames from 'classnames'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import validator from './validate'
import './index.scss'

/**
 * 抽出子元素的布局样式
 */
const separateLayoutStyle = (style: any): any=> {
    style = style || {}
    let separateStyle: any = {}
    const layoutStyles = ['width', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']
    layoutStyles.forEach((styleName: string)=> {
        separateStyle[styleName] = _.cloneDeep(style[styleName])
        style[styleName] = null
    })
    return separateStyle
}

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

        // input 的样式加在父级上
        const rootStyle: any = separateLayoutStyle(this.props['style'])

        const inputClasses = classNames({
            'input': true,
            'no-label': this.props.label === '',
            [this.props.textAlign]: true
        })

        const labelClasses = classNames({
            'label': true,
            [this.props.textAlign]: true
        })

        const bottomBarClasses = classNames({
            'bottom-bar': true,
            'bottom-bar-error': this.state.hasError
        })

        let HighlightLine: React.ReactElement<any> = null
        if (this.props.highlightLine) {
            HighlightLine = <span className={bottomBarClasses}/>
        }

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
                {this.props.innerRender.constructor.name === 'Function' ? this.props.innerRender() : this.props.innerRender}
                {Highlight}
                {HighlightLine}
                <label className={labelClasses}>{this.props.label}{ErrorLabel}</label>
            </div>
        )
    }
}