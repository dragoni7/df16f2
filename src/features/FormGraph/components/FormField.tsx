import { Cancel, ExpandMoreOutlined, StorageOutlined } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { GLOBAL_DATA } from '../util/global-data';

interface FormFieldProps<T extends Record<string, any>> {
  field: keyof T;
  control: Control<T>;
  errors: FieldErrors<T>;
  defaultValue?: string;
  prefillOptions: Record<string, string[]>;
}

export default function FormField<T extends Record<string, any>>(props: FormFieldProps<T>) {
  const { field, control, errors, defaultValue, prefillOptions } = props;
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
          <Accordion
            disableGutters
            variant="outlined"
            elevation={0}
            sx={{ backgroundColor: 'transparent' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <Typography>Global Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {GLOBAL_DATA.map((g) => (
                  <ListItem>{g}</ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          {Object.entries(prefillOptions).map(([key, value]) => (
            <Accordion
              disableGutters
              variant="outlined"
              elevation={0}
              sx={{ backgroundColor: 'transparent' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                <Typography>{key}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {value.map((v) => (
                    <ListItem>{v}</ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
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
