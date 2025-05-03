export type ActionBlueprintGraphData = {
  $schema: string;
  blueprint_id: string;
  blueprint_name: string;
  branches: ActionBlueprintBranch[];
  edges: ActionBlueprintEdge[];
  forms: ActionBlueprintForm[];
  nodes: ActionBlueprintNode[];
  status: 'draft' | 'published' | 'historical' | 'archived';
  tenant_id: string;
  triggers: ActionBlueprintTrigger[];
  version_id: string;
  version_notes: string;
  version_number: string;
};

export type ActionBlueprintBranch = {
  $schema?: string;
  condition: any;
  created_at: Date;
  created_by: string;
  description: string;
  id: string;
  name: string;
  tenant_id: string;
  updated_at: Date;
};

export type ActionBlueprintEdge = {
  source: string;
  target: string;
};

export type ActionBlueprintForm = {
  $schema?: string;
  custom_javascript?: string;
  custom_javascript_triggering_fields?: string[];
  description: string;
  dynamic_field_config: Record<string, DynamicFieldConfig>;
  field_schema: FieldSchema;
  id: string;
  is_resuable: boolean;
  name: string;
  ui_schema?: UISchema;
  vendor_schema?: Record<string, any>;
};

export type DynamicFieldConfig = {
  endpoint_id: string;
  output_key?: string;
  payload_fields: Record<string, any>;
  selector_field: string;
};

export type FieldSchema = {
  properties: Record<string, any>;
  required?: string[];
  type: string;
};

export type UISchema = {
  elements: any[];
  type: string;
};

export type ActionBlueprintNode = {
  data: NodeData;
  id: string;
  position: { x: number; y: number };
  type: 'form' | 'branch' | 'trigger' | 'configuration';
};

export type NodeData = {
  approval_auto_assign_config?: AutoAssignConfig;
  approval_required: boolean;
  approval_roles: string[];
  approval_scheduled_delay?: Duration;
  approval_sla_duration?: Duration;
  approval_task_name?: string;
  auto_assign_config?: AutoAssignConfig;
  component_id: string;
  component_key: string;
  component_type: 'form' | 'branch' | 'trigger' | 'configuration';
  data_promotion_config?: Record<string, string>;
  id: string;
  input_mapping: Record<string, any>;
  name: string;
  permitted_roles: string[];
  prerequisites: string[];
  scheduled_delay?: Duration;
  sla_duration?: Duration;
  state_transition_rules?: StateTransitionRules;
};

export type AutoAssignConfig = {
  form_field?: string;
  form_key?: string;
  type: 'client_org_role' | 'primary_email' | 'form_field_email';
  value?: string;
};

export type Duration = {
  number: number;
  unit: 'minutes' | 'hours' | 'days';
};

export type StateTransitionRules = {
  state_transition_rules_if: any;
  state_transition_rules_then: 'pending_approval' | 'complete';
};

export type ActionBlueprintTrigger = {
  $schema?: string;
  created_at: Date;
  id: string;
  max_retries?: number;
  name: string;
  output_mapping: Record<string, string>;
  path_template: string;
  path_template_variables: string[];
  payload_template: Record<string, any>;
  payload_template_variables: string[];
  query_parameter_template: Record<string, string>;
  query_parameter_template_variables: string[];
  request_method: 'POST' | 'PUT' | 'GET' | 'DELETE';
  timeout_seconds?: number;
  trigger_service_id: string;
  updated_at: Date;
};

export type PrefillOptions = {
  global: boolean;
  transitive: boolean;
};

export type PrefillData = {
  label: string;
  dataPrefix: string;
  data: string[];
};
