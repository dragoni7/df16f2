import { PrefillData, NodeData } from '../types';
import { ActionBlueprintGraph } from './action-blueprint-graph';
import { GLOBAL_DATA } from './global-data';

/**
 * Builder for creating a PrefillData object for forms.
 */
export class PrefillDataBuilder {
  private _prefillData: PrefillData[];
  private readonly _currentNodeData: NodeData;
  private readonly _graph: ActionBlueprintGraph;

  public constructor(currentNodeData: NodeData, graph: ActionBlueprintGraph) {
    this._currentNodeData = currentNodeData;
    this._graph = graph;
    this._prefillData = [];
  }

  public buildGlobalData() {
    this._prefillData.push({
      label: 'Global Data',
      dataPrefix: 'Global',
      data: GLOBAL_DATA,
    });
  }

  public buildTransitiveData() {
    for (const nodeId of this._graph.getPrevNodes(this._currentNodeData.component_key)) {
      const nodeData = this._graph.getNodeData(nodeId);

      if (!nodeData) continue;

      const formData = this._graph.getFormById(nodeData.component_id);

      if (!formData) continue;

      this._prefillData.push({
        label: nodeData.name,
        dataPrefix: nodeData.name,
        data: Object.keys(formData.dynamic_field_config),
      });
    }
  }

  public buildPrereqData() {
    for (const nodeId of this._currentNodeData.prerequisites) {
      const nodeData = this._graph.getNodeData(nodeId);

      if (!nodeData) continue;

      const formData = this._graph.getFormById(nodeData.component_id);

      if (!formData) continue;

      this._prefillData.push({
        label: nodeData.name,
        dataPrefix: nodeData.name,
        data: Object.keys(formData.dynamic_field_config),
      });
    }
  }

  public getData() {
    const data: PrefillData[] = [...this._prefillData];
    this._prefillData = [];
    return data;
  }
}
