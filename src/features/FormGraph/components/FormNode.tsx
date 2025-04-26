import { ViewListOutlined } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
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
      <Paper
        elevation={1}
        sx={{
          padding: 1,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          height: '100%',
          width: '100%',
          outline: '1px solid grey',
          paddingRight: 10,
        }}
      >
        <Box
          height="100%"
          sx={{
            backgroundColor: 'rgb(72, 100, 224)',
            borderRadius: 2,
            p: 1,
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => onClick(data.id)}
        >
          <ViewListOutlined />
        </Box>
        <Box height="100%">
          <Typography variant="subtitle2">Form</Typography>
          <label htmlFor="text">{data.name}</label>
        </Box>
      </Paper>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
