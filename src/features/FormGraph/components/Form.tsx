import { Box, FormControl, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { NodeData } from '../types';

interface FormProps {
  data: NodeData;
}
export default function Form(props: FormProps) {
  const { data } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  });

  return (
    <Stack>
      <Typography variant="h6">Prefill</Typography>
      <Typography variant="caption">Prefill fields for this form</Typography>
      {data.component_id}
      <Box component="form" onSubmit={handleSubmit(() => console.log('submit'))}>
        <Controller
          name=""
          control={control}
          defaultValue=""
          render={({ field }) => <FormControl fullWidth margin="normal"></FormControl>}
        />
      </Box>
    </Stack>
  );
}
