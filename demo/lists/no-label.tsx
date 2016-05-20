import * as React from 'react'
import Input from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <div>
                <Input label=""/>
                <Input label=""
                       placeholder="只有 placeholder"/>
            </div>
        )
    }
}