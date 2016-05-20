import * as React from 'react'
import {Input, ExtendValidatorStatic} from '../../src'

const testValidator = (value: string, validator: ExtendValidatorStatic): any => {
    if (!validator.notEmpty(value)) {
        return {
            ok: false,
            errorMessage: '内容不能为空'
        }
    }
    
    if (!validator.isUrl(value)) {
        return {
            ok: false,
            errorMessage: '必须是一个url地址'
        }
    }

    if (!validator.contains(value, 'fit')) {
        return {
            ok: false,
            errorMessage: '必须含有『fit』'
        }
    }

    return { ok: true }
}

export default class Demo extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Input validateMiddleware={testValidator}/>
            </div>
        )
    }
}