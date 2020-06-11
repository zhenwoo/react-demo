import React from 'react';
import classNames from 'classnames'
import { IProps, IState} from './interface'
class SlideBox extends React.Component<IProps,IState >{
	private ref1 = React.createRef<HTMLDivElement>()
	private ref2 = React.createRef<HTMLDivElement>()
	constructor(props: IProps) {
		super(props);
		this.state = {
			x: 0,
			y: 0,
		}
	}
	componentDidMount () {
	}
	render () {
		const { model, children} = this.props
		return (
			<div className="split-wrapper">
				<div ref={this.ref1} className={classNames('split-item split-item-1', model === 'h' ? 'split-item-1-h' : 'split-item-1-v' )}>
					{children[0]}
				</div>
				<div ref={this.ref2} className={classNames('split-item split-item-2', model === 'h' ? 'split-item-2-h' : 'split-item-2-v')}>
					{children[1]}
				</div>
			</div>
		);
	}
}
export default SlideBox
