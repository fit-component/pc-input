import * as React from 'react'
import Input from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <div>
                <Input icon="search"
                       width={150}/>
                <Input label="姓名"
                       labelWidth={60}
                       icon="search"
                       style={{marginTop:10}}/>
                <Input addonLeft="高度"
                       addonRight="%"
                       icon="search"
                       style={{marginTop:10}}/>
            </div>
        )
    }
}