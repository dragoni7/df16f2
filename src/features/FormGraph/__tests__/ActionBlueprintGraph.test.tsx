import { ActionBlueprintGraph } from '../util/action-blueprint-graph';
import { TEST_GRAPH_DATA } from '../util/test-graph-data';

describe('ActionBlueprintGraph', () => {
  const testGraph = new ActionBlueprintGraph(TEST_GRAPH_DATA);

  test('Test getNodeData method', () => {
    expect(testGraph.getNodeData('form-a')?.name).toBe('Form A');
    expect(testGraph.getNodeData('form-b')?.name).toBe('Form B');
    expect(testGraph.getNodeData('form-c')?.name).toBe('Form C');
    expect(testGraph.getNodeData('form-d')?.name).toBe('Form D');
    expect(testGraph.getNodeData('form-e')?.name).toBe('Form E');
    expect(testGraph.getNodeData('form-f')?.name).toBeUndefined();
    expect(testGraph.getNodeData('form')?.name).toBeUndefined();
    expect(testGraph.getNodeData('')?.name).toBeUndefined();
  });

  test('Test getFormById method', () => {
    expect(testGraph.getFormById('f_1')?.name).toBe('test form');
    expect(testGraph.getFormById('f_2')?.name).toBe('test form');
    expect(testGraph.getFormById('f_3')?.name).toBe('test form');
    expect(testGraph.getFormById('f_4')).toBeUndefined();
    expect(testGraph.getFormById('form-a')).toBeUndefined();

    // form referenced by node exists in the graph
    const nodeData = testGraph.getNodeData('form-a');
    expect(nodeData).toBeDefined();
    expect(nodeData?.component_id).toBeDefined();
    const component_id = nodeData?.component_id;
    expect(testGraph.getFormById(component_id!)?.id).toBe(component_id);
  });

  test('Test getPrevNodes method', () => {
    expect(testGraph.getPrevNodes('form-a')).toStrictEqual([]); // first node in graph has no prev
    expect(testGraph.getPrevNodes('form-b')).toStrictEqual(['form-a']); // second node only has one prev
    expect(testGraph.getPrevNodes('form-e')).toStrictEqual(['form-d', 'form-b', 'form-a']); // last node has 3 prev
    expect(testGraph.getPrevNodes('form-z')).toStrictEqual([]); // non-existing node
  });

  test('Test getData method', () => {
    expect(testGraph.getData()).toBe(TEST_GRAPH_DATA);
  });
});
