import React from 'react';
interface IState {
	x: number
	y: number
}
interface IProps {
	lockX?: boolean
	lockY?: boolean
	width?: number
}
class SlideBox extends React.Component<IProps,IState >{
	constructor(props: IProps) {
		super(props);
		this.state = {
			x: 0,
			y: 0,
		}
	}
	render () {
		const {lockX, lockY} = this.props
		return (
			<div className="split-wrapper">
				<p>lockX{lockX}</p>
				<p>lockX{lockY}</p>
			</div>
		);
	}
}
export default SlideBox
