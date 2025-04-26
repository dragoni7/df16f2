import { Container } from '@mui/material';
import FormGraph from '../features/FormGraph/components/FormGraph';
import ActionBlueprintGraphProvider from '../features/FormGraph/components/ActionBlueprintGraphProvider';

function App() {
  return (
    <Container maxWidth="xl" sx={{ height: '100vh' }}>
      <ActionBlueprintGraphProvider>
        <FormGraph />
      </ActionBlueprintGraphProvider>
    </Container>
  );
}

export default App;
