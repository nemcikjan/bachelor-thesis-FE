import { NodeData } from './app.model';

class PatchData {
  static readonly type = '[App] Patch data';
  constructor(public payload: NodeData) {}
}

class SetData {
  static readonly type = '[App] Set data';
  constructor(public payload: NodeData[]) {}
}
export { PatchData, SetData };
