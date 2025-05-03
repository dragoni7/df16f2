import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NodeData, ActionBlueprintForm, PrefillData } from '../types';
import useActionBlueprintGraph from '../hooks/useActionBlueprintGraph';
import { useEffect, useState } from 'react';
import FormField from './FormField';
import usePrefillOptions from '../hooks/usePrefillOptions';
import { PrefillDataBuilder } from '../util/prefill-data-builder';

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
  const [actionBlueprintForm, setActionBlueprintForm] = useState<ActionBlueprintForm | undefined>(
    undefined
  );
  const prefillOptions = usePrefillOptions();
  const [prefillData, setPrefillData] = useState<PrefillData[]>([]);
  const { data } = props;

  let prefillDataBuilder: PrefillDataBuilder;

  useEffect(() => {
    if (!loading && graph) {
      setActionBlueprintForm(graph.getFormById(data.component_id));

      // initialize builder
      if (!prefillDataBuilder) prefillDataBuilder = new PrefillDataBuilder(data, graph);

      if (prefillOptions.global) prefillDataBuilder.buildGlobalData();

      if (prefillOptions.transitive) {
        prefillDataBuilder.buildTransitiveData();
      } else {
        prefillDataBuilder.buildPrereqData();
      }

      setPrefillData(prefillDataBuilder.getData());
    }
  }, [loading, prefillOptions]);

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
        {actionBlueprintForm &&
          Object.keys(actionBlueprintForm.dynamic_field_config).map((key, index) => (
            <FormField
              key={key + index}
              field={key}
              control={control}
              errors={errors}
              label={key}
              prefillData={prefillData}
            />
          ))}
      </Box>
    </Stack>
  );
}
