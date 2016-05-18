import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'
import * as _ from 'lodash'
import * as $ from 'jquery'
import * as classNames from 'classnames'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import './index.scss'

export default class Input extends React.Component<module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    constructor(props: any) {
        super(props)
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

        return (
            <div {...others(new module.Props(), this.props)} className={classes}>
                <input className="input"/>
                {Highlight}
                <span className="bottom-bar"/>
                <label className="placeholder">{this.props.placeholder}</label>
            </div>
        )
    }
}