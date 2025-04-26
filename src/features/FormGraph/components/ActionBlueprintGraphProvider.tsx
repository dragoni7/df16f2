import { createContext, ReactNode, useEffect, useState } from 'react';
import { BlueprintGraph, Form } from '../types';
import { GetActionBlueprintGraph } from '../api/get-action-blueprint-graph';

type ActionBlueprintGraphContextProps = {
  graph: BlueprintGraph | null;
  loading: boolean;
  getForm: (id: string) => Form | undefined;
};

export const ActionBlueprintGraphContext = createContext<ActionBlueprintGraphContextProps>({
  graph: null,
  loading: false,
  getForm: function (id: string): Form | undefined {
    throw new Error('Function not implemented.');
  },
});

export default function ActionBlueprintGraphProvider({ children }: { children: ReactNode }) {
  const [graph, setGraph] = useState<BlueprintGraph | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function getForm(id: string): Form | undefined {
    return graph?.forms.find((f) => f.id === id);
  }

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true);
      const graph = await GetActionBlueprintGraph();
      setGraph(graph);
      setLoading(false);
    }

    fetchGraph().catch(console.error);
  }, []);

  return (
    <ActionBlueprintGraphContext.Provider value={{ graph, loading, getForm }}>
      {children}
    </ActionBlueprintGraphContext.Provider>
  );
}
