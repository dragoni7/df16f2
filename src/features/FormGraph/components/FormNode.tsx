import { Paper } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import { useCallback } from 'react';

export default function FormNode({ data }: any) {
  const onClick = useCallback((id: string) => {
    console.log(id);
  }, []);

  // TODO: implement the form
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Paper sx={{ padding: 4 }} onClick={() => onClick(data.id)}>
        <label htmlFor="text">{data.name}</label>
      </Paper>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
