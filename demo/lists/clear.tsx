import * as React from 'react'
import Input from '../../src'
import Button from '../../../button/src'

export default class Demo extends React.Component <any,any> {
    refs: any

    constructor(props: any) {
        super(props)
    }

    onClick() {
        this.refs['input'].clear();
    }

    render() {
        return (
            <div>
                <Input ref="input"
                       width={200}/>
                <Button onClick={this.onClick.bind(this) }>clear</Button>
            </div>
        )
    }
}