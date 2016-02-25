import React from 'react'
import Input from 'fit-input'
import Button from 'fit-button'

export default class Demo extends React.Component {
	constructor(props) {
		super(props)
	}

	onClick () {
		this.inputInstance.clear();
	}

	render() {
		return (
				<div>
					<Input ref={(ref) => {
						this.inputInstance = ref
					}}
						width={200}
					/>
					<Button onClick={this.onClick.bind(this)}>clear</Button>
				</div>
		)
	}
}