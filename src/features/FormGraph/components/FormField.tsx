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
import { GLOBAL_DATA } from '../util/global-data';
import PrefillDataSource from './PrefillDataSource';

interface FormFieldProps<T extends Record<string, any>> {
  field: keyof T;
  control: Control<T>;
  errors: FieldErrors<T>;
  defaultValue: string;
  prefillOptions: Record<string, string[]>;
}

/**
 * A field with selectable prefill options.
 * @param props
 * @returns
 */
export default function FormField<T extends Record<string, any>>(props: FormFieldProps<T>) {
  const { field, control, errors, defaultValue, prefillOptions } = props;
  const [prefillOpen, setPrefillOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');

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
            placeholder={defaultValue}
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
          <PrefillDataSource
            onOptionClicked={setSelectedOption}
            selectedOption={selectedOption}
            label={'Global Data'}
            dataPrefix={'Global'}
            options={GLOBAL_DATA}
          />
          {Object.entries(prefillOptions).map(([key, value]) => (
            <PrefillDataSource
              onOptionClicked={setSelectedOption}
              selectedOption={selectedOption}
              label={key}
              dataPrefix={key}
              options={value}
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
    </>
  );
}
