import * as React from 'react'
import Input from '../../src'

export default class Demo extends React.Component <any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleChange(value:string) {
        this.setState({
            value: value
        })
    }

    render() {
        return (
            <div>
                <Input value={this.state.value}
                       onChange={this.handleChange.bind(this)}/>
                {this.state.value}
            </div>
        )
    }
}