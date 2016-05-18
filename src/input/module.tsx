export interface PropsInterface {
    /**
     * 提示文字
     */
    placeholder?: string

    /**
     * 获得焦点是否高亮
     */
    highlight?: boolean

    [x: string]: any
}

export class Props implements PropsInterface {
    placeholder = ''
    highlight = false
}

export interface StateInterface {

}

export class State implements StateInterface {

}