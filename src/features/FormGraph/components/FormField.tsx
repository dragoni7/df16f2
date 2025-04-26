import { Cancel, StorageOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface FormFieldProps<T extends Record<string, any>> {
  field: keyof T;
  control: Control<T>;
  errors: FieldErrors<T>;
  defaultValue?: string;
}

export default function FormField<T extends Record<string, any>>(props: FormFieldProps<T>) {
  const { field, control, errors, defaultValue } = props;
  const [prefillOpen, setPrefillOpen] = useState<boolean>(false);

  return (
    <>
      <Controller
        name={field as any}
        control={control}
        render={({ field: renderField }) => (
          <TextField
            {...renderField}
            fullWidth
            margin="normal"
            defaultValue={defaultValue ? defaultValue : ''}
            error={!!errors[field as string]}
            helperText={errors[field as string]?.message as string}
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <StorageOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Cancel />
                    </IconButton>
                  </InputAdornment>
                ),
                readOnly: true,
              },
            }}
            onClick={() => setPrefillOpen(true)}
          />
        )}
      />
      <Drawer open={prefillOpen} anchor="left">
        <Typography variant="h6" p={1}>
          Select data element to map
        </Typography>
        <Divider />
        <Box p={2} overflow="scroll" height="100%" sx={{ backgroundColor: 'lightgrey' }}>
          <Typography>Available data</Typography>
        </Box>
        <Divider />
        <Stack direction="row" justifyContent="end" p={1} spacing={2}>
          <Button variant="outlined" onClick={() => setPrefillOpen(false)}>
            Cancel
          </Button>
          <Button variant="outlined">Select</Button>
        </Stack>
      </Drawer>
    </>
  );
}
