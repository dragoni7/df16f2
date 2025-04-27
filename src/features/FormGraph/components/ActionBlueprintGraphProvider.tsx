import { createContext, ReactNode, useEffect, useState } from 'react';
import { GetActionBlueprintGraphData as GetActionBlueprintGraphData } from '../api/get-action-blueprint-graph-data';
import { ActionBlueprintGraph } from '../util/action-blueprint-graph';

type ActionBlueprintGraphContextProps = {
  graph: ActionBlueprintGraph | null;
  loading: boolean;
};

export const ActionBlueprintGraphContext = createContext<ActionBlueprintGraphContextProps>({
  graph: null,
  loading: false,
});

/**
 * Provides the action blueprint graph for the app.
 * @param param0
 * @returns
 */
export default function ActionBlueprintGraphProvider({ children }: { children: ReactNode }) {
  const [actionBlueprintGraph, setActionBlueprintGraph] = useState<ActionBlueprintGraph | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true);
      const graphData = await GetActionBlueprintGraphData();
      const graph = graphData ? new ActionBlueprintGraph(graphData) : null;
      setActionBlueprintGraph(graph);
      setLoading(false);
    }

    fetchGraph().catch(console.error);
  }, []);

  return (
    <ActionBlueprintGraphContext.Provider value={{ graph: actionBlueprintGraph, loading }}>
      {children}
    </ActionBlueprintGraphContext.Provider>
  );
}
