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
    <Paper
      elevation={1}
      sx={{
        padding: 1,
        display: 'flex',
        gap: 1,
        height: '100%',
        width: '100%',
        outline: '2px solid rgb(188, 191, 196)',
        paddingRight: 10,
        borderRadius: 2,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Box
        sx={{
          backgroundColor: 'rgb(83, 110, 228)',
          borderRadius: 2,
          p: 1,
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
          alignContent: 'center',
          textAlign: 'center',
        }}
        onClick={() => setFormOpen(true)}
      >
        <ViewListOutlined />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          Form
        </Typography>

        <Typography variant="h6">
          <label htmlFor="text">{data.name}</label>
        </Typography>
      </Box>
      <Handle type="source" position={Position.Right} />
      <Drawer open={formOpen} onClose={() => setFormOpen(false)} anchor="bottom">
        <Form data={data} />
      </Drawer>
    </Paper>
  );
}
