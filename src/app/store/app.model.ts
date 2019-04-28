export interface AppStateModel {
  data: NodeData[];
}

export interface NodeData {
  nodeId: string;
  [key: string]: any;
}
