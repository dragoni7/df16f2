import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NodeData, ActionBlueprintForm } from '../types';
import useActionBlueprintGraph from '../hooks/useActionBlueprintGraph';
import { useEffect, useState } from 'react';
import FormField from './FormField';

interface FormProps {
  data: NodeData;
}

/**
 * A form that supports prefill mapping via an action blueprint graph.
 * @param props
 * @returns
 */
export default function Form(props: FormProps) {
  const { graph, loading } = useActionBlueprintGraph();
  const [formData, setFormData] = useState<ActionBlueprintForm | undefined>(undefined);
  const [predecessorFormOptions, setPredecessorFormOptions] = useState<Record<string, string[]>>(
    {}
  );

  const { data } = props;

  useEffect(() => {
    if (!loading && graph) {
      setFormData(graph.getFormById(data.component_id));

      const pFormOptions: Record<string, string[]> = {};

      // retrieve prefill data
      for (const nodeId of graph.getPrevNodes(data.component_key)) {
        const nodeData = graph.getNodeData(nodeId);

        if (!nodeData) continue;

        const formData = graph.getFormById(nodeData.component_id);

        if (!formData) continue;

        pFormOptions[nodeData.name] = Object.keys(formData.dynamic_field_config);
      }

      setPredecessorFormOptions(pFormOptions);
    }
  }, [loading]);

  const {
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  });

  return (
    <Stack p={2} marginTop={4} marginBottom={10}>
      <Typography variant="h6">Prefill</Typography>
      <Typography variant="caption">Prefill fields for this form</Typography>
      <Box component="form" marginTop={2}>
        {formData &&
          Object.keys(formData.dynamic_field_config).map((key) => (
            <FormField
              field={key}
              control={control}
              errors={errors}
              defaultValue={key}
              prefillOptions={predecessorFormOptions}
            />
          ))}
      </Box>
    </Stack>
  );
}
