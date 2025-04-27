import { ViewListOutlined } from '@mui/icons-material';
import { Box, Drawer, Paper, Typography } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import Form from './Form';

/**
 * Custom node type for forms.
 * @param param0 the node's data
 * @returns the custom form node
 */
export default function FormNode({ data }: any) {
  const [formOpen, setFormOpen] = useState<boolean>(false);

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
          onClick={() => setFormOpen(true)}
        >
          <ViewListOutlined />
        </Box>
        <Box height="100%">
          <Typography variant="subtitle2">Form</Typography>
          <label htmlFor="text">{data.name}</label>
        </Box>
      </Paper>
      <Handle type="source" position={Position.Right} />
      <Drawer open={formOpen} onClose={() => setFormOpen(false)} anchor="bottom">
        <Form data={data} />
      </Drawer>
    </>
  );
}
