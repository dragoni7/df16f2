import { Box, FormControl } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function Form() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  });

  return (
    <Box component="form" onSubmit={handleSubmit(() => console.log('submit'))}>
      <Controller
        name=""
        control={control}
        defaultValue=""
        render={({ field }) => <FormControl fullWidth margin="normal"></FormControl>}
      />
    </Box>
  );
}
