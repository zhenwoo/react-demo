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
        <div className="header"></div>
        <div className="body">
          <div className="nav">
            
          </div>
          <div className="content">
            <SplitBox model="h" width={350}>
              <div>左侧</div>
              <div className="workspaces" ref={this.wrapper}>
                <TaskSpace width={width} height={height} padding={85}>
                  <TreeNode
                    data={familyData}
                    onNodeContextMenu={this.handleOnNodeContextMenu.bind(this)}
                    onNodeSelected={this.handleOnNodeSelected.bind(this)}
                  />
                </TaskSpace>
              </div>
            </SplitBox>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
