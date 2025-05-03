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
import PrefillDataSource from './PrefillDataSource';
import { PrefillData } from '../types';

interface FormFieldProps<T extends Record<string, any>> {
  field: keyof T;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  prefillData: PrefillData[];
}

/**
 * A field with selectable prefill options.
 * @param props
 * @returns
 */
export default function FormField<T extends Record<string, any>>(props: FormFieldProps<T>) {
  const { field, control, errors, label, prefillData } = props;
  const [prefillOpen, setPrefillOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <Box>
      <Controller
        name={field as any}
        control={control}
        render={({ field: renderField }) => (
          <TextField
            {...renderField}
            fullWidth
            margin="normal"
            placeholder={label}
            error={!!errors[field as string]}
            helperText={errors[field as string]?.message as string}
            value={value}
            variant="filled"
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
                    {value !== '' && (
                      <IconButton onClick={() => setValue('')}>
                        <Cancel />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
                readOnly: true,
              },
            }}
            onClick={() => {
              if (value === '') setPrefillOpen(true);
            }}
          />
        )}
      />

      {/* Prefill Options */}
      <Drawer open={prefillOpen} anchor="left">
        <Typography variant="h6" p={1}>
          Select data element to map
        </Typography>
        <Divider />
        <Box p={2} overflow="scroll" height="100%" sx={{ backgroundColor: 'lightgrey' }}>
          <Typography>Available data</Typography>
          {prefillData.map((pData, index) => (
            <PrefillDataSource
              key={pData.label + index}
              onOptionClicked={setSelectedOption}
              selectedOption={selectedOption}
              label={pData.label}
              dataPrefix={pData.dataPrefix}
              options={pData.data}
            />
          ))}
        </Box>
        <Divider />
        <Stack direction="row" justifyContent="end" p={1} spacing={2}>
          <Button variant="outlined" onClick={() => setPrefillOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setValue(selectedOption);
              setPrefillOpen(false);
            }}
          >
            Select
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
