import { AppBar, Container, CssBaseline, Tab, Box, Typography} from '@mui/material'
import { TabContext, TabPanel, TabList } from '@mui/lab'; 
import './App.css'
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import { useState } from 'react';

function App() {
   const [value, setValue] = useState('2'); 

   const handleTabChange = (event, newValue) => {
     setValue(newValue); 
   };

  return (
      <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position='static'>
          <Typography variant='h5' style={{padding: 10}}>Best Trainings</Typography>
        </AppBar>
        <Box sx={{width:'100%'}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor:'divider'}}>
              <TabList onChange={handleTabChange}>
                  <Tab label="Customers" value="1" />
                  <Tab label="Trainings" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CustomerList />
            </TabPanel>
            <TabPanel value="2">
              <TrainingList />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
  );
}

export default App
