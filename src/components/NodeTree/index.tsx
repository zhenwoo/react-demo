import React,{useState, useContext, createContext} from 'react';
import classNames from 'classnames'
import {Node, Nodes} from "./interface";
import './style.css'
const Context = createContext({
	onNodeSelected: (data:Node):void => {},
	onNodeContextMenu:(data:Node):void => {}
})
const NodeTree:React.FC<Node> = props => {
	const {label, children} = props
	const [fold, setFold] = useState(true);
	const c = useContext(Context)
	const btnClass = classNames('node-btn', fold && 'node-btn-fold');
	return (
		<li className="node-cell">
			<div className={classNames('node-text',children && 'node-text-fold')}>
				<span
					onClick={
						(evt) => {
							c.onNodeSelected(props)
							evt.preventDefault()
							evt.stopPropagation()
						}
					}
					className="node-text-content"
					onContextMenu={evt => {
						c.onNodeSelected(props)
						evt.preventDefault()
						evt.stopPropagation()
					}}
				>{label}</span>
				{
					(children) &&
					<span className={btnClass} onClick={()=>setFold(!fold)}>
						<i className={classNames(fold ? 'tree-icon-close' : 'tree-icon-open')}></i>
					</span>
				}
			</div>
			{(children && fold) && <TreeNode data={children} {...c}/>}
		</li>
	);
}
const TreeNode:React.FC<Nodes> = (props) => {
	const { data, onNodeSelected, onNodeContextMenu } = props
	const nodes = data.map(item => {
		return <NodeTree {...item} key={item.id}/>
	})
	return (
		<Context.Provider value={{onNodeSelected, onNodeContextMenu}}>
			<ul className="node-table">
				{nodes}
			</ul>
		</Context.Provider>
	)
}

export default TreeNode;
