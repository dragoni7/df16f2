import { AppBar, Box, Container, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FormGraph from '../features/FormGraph/components/FormGraph';
import ActionBlueprintGraphProvider from '../features/FormGraph/components/ActionBlueprintGraphProvider';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DF16F2
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
          <ActionBlueprintGraphProvider>
            <FormGraph />
          </ActionBlueprintGraphProvider>
        </Container>

        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            backgroundColor: 'lightgray',
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            By dragoni7
          </Typography>
          <Divider orientation="vertical" flexItem />
          <IconButton
            color="inherit"
            aria-label="GitHub"
            component="a"
            href="https://github.com/dragoni7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            color="inherit"
            aria-label="LinkedIn"
            component="a"
            href="https://www.linkedin.com/in/samueldgibson/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
