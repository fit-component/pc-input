import * as React from 'react'
import {default as validator, ExtendValidatorStatic} from './validate'

export interface validateMiddlewareReturnInterface {
    ok: boolean
    errorMessage?: string
}

export interface PropsInterface {
    /**
     * 提示文字
     */
    label?: string

    /**
     * 获得焦点是否高亮
     */
    highlight?: boolean

    /**
     * 获得焦点是否有高亮线
     */
    highlightLine?: boolean

    /**
     * 右侧添加自定义元素
     */
    rightRender?: () => React.ReactElement<any>

    /**
     * 内部添加自定义元素
     */
    innerRender?: () => React.ReactElement<any>

    /**
     * 文字方向 居中或者靠左 left center
     */
    textAlign?: string

    /**
     * 验证回调,可以自定义更多验证逻辑
     */
    validateMiddleware?: (value?: string, validator?: ExtendValidatorStatic) => validateMiddlewareReturnInterface

    [x: string]: any
}

export class Props implements PropsInterface {
    label = '请输入内容'
    highlight = false
    highlightLine = true
    rightRender = (): any => {
        return null
    }
    innerRender = (): any => {
        return null
    }
    textAlign = 'left'
    validateMiddleware = () => {
        return {ok: true}
    }
}

export interface StateInterface {
    hasError?: boolean
    errorMessage?: string
}

export class State implements StateInterface {
    hasError = false
    errorMessage = ''
}