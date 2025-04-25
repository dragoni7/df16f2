/**
 *
 */
export async function GetGraph() {
  try {
    const response = await fetch(
      'http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) throw new Error(response.statusText);
  } catch (err) {
    console.error(err);
  }
}
