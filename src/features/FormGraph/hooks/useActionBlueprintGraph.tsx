import { useEffect, useState } from 'react';
import { GetActionBlueprintGraph } from '../api/get-action-blueprint-graph';
import { BlueprintGraph } from '../types';

/**
 * Use the action blueprint graph data served by a local server
 * @returns the graph data and loading state
 */
export default function useActionBlueprintGraph() {
  const [graph, setGraph] = useState<BlueprintGraph | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true);
      const graph = await GetActionBlueprintGraph();
      setGraph(graph);
      setLoading(false);
    }

    fetchGraph().catch(console.error);
  }, []);

  return { graph, loading };
}
