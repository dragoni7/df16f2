import { useContext } from 'react';
import { ActionBlueprintGraphContext } from '../components/ActionBlueprintGraphProvider';

/**
 * Use the action blueprint graph data served by a local server.
 * @returns the action blueprint graph context.
 */
export default function useActionBlueprintGraph() {
  const actionBlueprintGraph = useContext(ActionBlueprintGraphContext);

  if (!actionBlueprintGraph.loading && !actionBlueprintGraph.graph)
    console.error('Missing action blueprint graph!');

  return actionBlueprintGraph;
}
