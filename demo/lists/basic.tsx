import * as React from 'react'
import Input from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <div>
                <Input width={150}/>
                <Input label="姓名"
                       labelWidth={60}
                       style={{marginTop:10}}/>
                <Input addonLeft="高度"
                       addonRight="%"
                       style={{marginTop:10}}/>
            </div>
        )
    }
}