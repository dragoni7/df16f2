import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NodeData, DynamicForm } from '../types';
import useActionBlueprintGraph from '../hooks/useActionBlueprintGraph';
import { useEffect, useState } from 'react';
import FormField from './FormField';

interface FormProps {
  data: NodeData;
}
export default function Form(props: FormProps) {
  const { getForm, loading } = useActionBlueprintGraph();
  const [formData, setFormData] = useState<DynamicForm | undefined>(undefined);

  const { data } = props;

  useEffect(() => {
    if (!loading) {
      setFormData(getForm(data.component_id));
    }
  }, [loading]);

  const {
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  });

  return (
    <Stack p={2}>
      <Typography variant="h6">Prefill</Typography>
      <Typography variant="caption">Prefill fields for this form</Typography>
      <Box component="form" marginTop={2}>
        {formData &&
          Object.entries(formData.dynamic_field_config).map(([key, value]) => (
            <FormField field={key} control={control} errors={errors} defaultValue={key} />
          ))}
      </Box>
    </Stack>
  );
}
