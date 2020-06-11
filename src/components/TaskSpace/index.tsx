import React, {createRef} from 'react';
import classNames from 'classnames'
import './style.css';
interface IProps {
	children: any,
	width: number,
	height: number
}
interface IState {
	x: number
	y: number
	disX: number
	disY: number,
	cName: string
}
class TaskSpace extends React.Component<IProps, IState> {
	refEle: React.RefObject<any>
	flag: boolean = false
	constructor(props:IProps) {
		super(props);
		this.refEle = createRef()
		this.state = {
			x: 0,
			y: 0,
			disX: 0,
			disY: 0,
			cName: ''
		}
	}
	handleMousedown (e: React.MouseEvent) {
		const pos = this.refEle.current.getBoundingClientRect();
		this.flag = true;
		this.setState({
			disX: e.clientX - pos.left,
			disY: e.clientY - pos.top,
			cName: 'workspaced'
		});
		e.stopPropagation();
		e.preventDefault();
	}
	handleWheel (e:React.WheelEvent) {
		const pos = this.refEle.current.getBoundingClientRect();
		const {height} = this.props
		if (pos.height >= height) {
			let y = this.state.y;
			if (e.deltaY > 0) {
				if (Math.abs(height + Math.abs(y)) > pos.height) return;
				y -= 10;
			} else {
				if (y >= 0) return;
				y += 10;
				console.log(2)
			}
			this.setState({y});
		}
	}
	handleOnMove (e:MouseEvent) {
		const pos = this.refEle.current.getBoundingClientRect();
		if (this.flag) {
			let x = 0;
			let y = 0;
			if (this.props.width >= pos.width) {
				x = 0;
			} else {
				x = e.clientX - this.state.disX;
				if (x < 0) {
					if (Math.abs(pos.width - this.props.width) <= Math.abs(x)) {
						x = - Math.abs(pos.width - this.props.width);
					}
				} else {
					if (x >= 0) {
						x = 0;
					}
				}
			}

			if (this.props.height >= pos.height) {
				y = 0;
			} else {
				y = e.clientY - this.state.disY;
				if (y < 0) {
					if (Math.abs(pos.height - this.props.height) <= Math.abs(y)) {
						y = - Math.abs(pos.height - this.props.height);
					}
				} else {
					if (y >= 0) {
						y = 0;
					}
				}
			}
			this.setState({x, y});
		}
	}
	componentDidMount () {
		document.onmousemove =  (e) => {
			this.handleOnMove(e);
			e.stopPropagation();
			e.preventDefault();
		};
		document.onmouseup = (e) => {
			this.flag = false;
			this.setState({
				cName: ''
			})
		};
	}

	render (){
		const {x, y} = this.state;
		return (
			<div className="workspace-wrapper">
				<div
					className={classNames('workspace', this.state.cName)}
					ref={this.refEle}
					onMouseDown={this.handleMousedown.bind(this)}
					onWheel={this.handleWheel.bind(this)}
					style={{left:x + 'px', top: y + 'px'}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default TaskSpace
