import { ActionBlueprintGraphData } from '../types';

/**
 * Fetches the action blueprint graph from local server
 */
export async function GetActionBlueprintGraph(): Promise<ActionBlueprintGraphData | null> {
  try {
    const response = await fetch(
      'http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
      {
        method: 'GET',
      }
    );

    if (!response.ok) throw new Error(response.statusText);

    const data: ActionBlueprintGraphData = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
