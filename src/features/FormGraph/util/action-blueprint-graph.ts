import { ActionBlueprintGraphData, ActionBlueprintForm, NodeData } from '../types';

/**
 * A directed acyclic graph of nodes containing form data.
 */
export class ActionBlueprintGraph {
  private readonly _data: ActionBlueprintGraphData;
  private readonly _predecessorsMap: Map<string, string[]>;

  public constructor(data: ActionBlueprintGraphData) {
    this._data = data;
    this._predecessorsMap = new Map();

    for (const edge of this._data?.edges) {
      if (!this._predecessorsMap.has(edge.target)) {
        this._predecessorsMap.set(edge.target, []);
      }
      this._predecessorsMap.get(edge.target)!.push(edge.source);
    }
  }

  public getData(): ActionBlueprintGraphData {
    return this._data;
  }

  /**
   * Get a form by it's id.
   * @param formId form's component id.
   * @returns the form's data or undefined if not found.
   */
  public getFormById(formId: string): ActionBlueprintForm | undefined {
    return this._data.forms.find((f) => f.id === formId);
  }

  /**
   * Get node data by node id.
   * @param nodeId
   * @returns the node's data or undefined if not found.
   */
  public getNodeData(nodeId: string): NodeData | undefined {
    return this._data.nodes.find((n) => n.id === nodeId)?.data;
  }

  /**
   * * Get previous nodes connecting to node with id.
   * @param nodeId
   * @returns array of previous nodes.
   */
  public getPrevNodes(nodeId: string): string[] {
    const prevNodes = new Set<string>();
    const bfsQueue: string[] = [];

    const directPredecessors = this._predecessorsMap.get(nodeId) || [];
    directPredecessors.forEach((pred) => bfsQueue.push(pred));

    // bfs
    while (bfsQueue.length > 0) {
      const current = bfsQueue.shift()!;

      if (prevNodes.has(current)) continue;

      prevNodes.add(current);

      const predecessors = this._predecessorsMap.get(current) || [];
      predecessors.forEach((pred) => {
        if (!prevNodes.has(pred)) {
          bfsQueue.push(pred);
        }
      });
    }

    return Array.from(prevNodes);
  }
}
