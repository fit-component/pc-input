import React from 'react'
import Input from 'fit-input'

export default class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleChange(value) {
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