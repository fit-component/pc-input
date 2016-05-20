import * as React from 'react'
import Input from '../../src'

export default class Demo extends React.Component <any,any> {
    handleChange(event: any) {
        console.log(event.target.value)
    }

    render() {
        return (
            <Input onChange={this.handleChange.bind(this)}/>
        )
    }
}