import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useActionBlueprintGraph from '../hooks/useActionBlueprintGraph';
import { Box } from '@mui/material';
import FormNode from './FormNode';
import { useEffect } from 'react';
import { Edge } from '../types';

/**
 * Our custom nodes.
 */
const nodeTypes = {
  form: FormNode,
};

/**
 * A graph of forms using ReactFlow and action blueprint graph data.
 * @returns The form graph
 */
export default function FormGraph() {
  const { graph, loading } = useActionBlueprintGraph();

  useEffect(() => {
    if (!loading && graph) console.log(graph.getData().nodes);
  }, []);

  return (
    <Box width="100%" height="100%" p={2}>
      {!loading && graph ? (
        <ReactFlow
          nodes={graph.getData().nodes}
          edges={graph.getData().edges.map((e: Edge) => {
            return { id: e.source + '-' + e.target, source: e.source, target: e.target };
          })}
          nodeTypes={nodeTypes}
        >
          <Background color="#93a4d9" variant={BackgroundVariant.Dots} />
        </ReactFlow>
      ) : (
        <div>Loading</div>
      )}
    </Box>
  );
}
