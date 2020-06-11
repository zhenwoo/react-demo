type numOrStr = string | number
export interface Node {
	id:numOrStr
	pid: numOrStr,
	label: string
	children?: Array<Node>

}
export interface Nodes {
	data: Array<Node>
	onNodeSelected: (data:Node) => void
	onNodeContextMenu: (data:Node) => void
}
