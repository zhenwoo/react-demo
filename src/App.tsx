import React, {createRef} from 'react';
import TreeNode from './components/NodeTree/index'
import TaskSpace from './components/TaskSpace/index'
import familyData from './mockData/family'
import './style/globle.css'
import {numOrStr} from "./components/NodeTree/interface";
import SplitBox from './components/SplitBox/index'
interface Node {
  id:numOrStr
  pid: numOrStr,
  label: string
  children?: Array<Node>

}
class App extends React.Component<any, any>{
  wrapper: React.RefObject<any>
  constructor (props: any) {
    super(props)
    this.wrapper = createRef()
    this.state = {
      width: 0,
      height: 0
    }
  }
  resize () {
    const c = this.wrapper.current.getBoundingClientRect()
    this.setState({
      width: c.width,
      height: c.height
    })
  }
  handleOnNodeContextMenu (data:Node) {
    console.log(data)
  }
  handleOnNodeSelected (data:Node) {
    console.log(data)
  }
  componentDidMount () {
    if (this.wrapper.current) {
      this.resize()
      window.onresize = () => {
        this.resize()
      }
    }
  }
  render () {
    const {width, height} = this.state
    return (
      <div className="App">
        <SplitBox lockY={true} lockX={false}></SplitBox>
        <div className="workspaces" ref={this.wrapper}>
          <TaskSpace width={width} height={height}>
            <TreeNode
              data={familyData}
              onNodeContextMenu={this.handleOnNodeContextMenu.bind(this)}
              onNodeSelected={this.handleOnNodeSelected.bind(this)}
            />
          </TaskSpace>
        </div>
      </div>
    );
  }
}

export default App;
