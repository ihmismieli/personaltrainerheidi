import { AppBar, Container, CssBaseline, Tab, Box, Typography} from '@mui/material'
import { TabContext, TabPanel, TabList } from '@mui/lab'; 
import './App.css'
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import { useState } from 'react';
import CalendarTabs from './components/CalendarTabs';
import Statics from './components/Statics';

function App() {
   const [value, setValue] = useState('1'); 

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
                  <Tab label="Calendar" value="3" />
                  <Tab label="Statics" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CustomerList />
            </TabPanel>
            <TabPanel value="2">
              <TrainingList />
            </TabPanel>
            <TabPanel value="3">
              <CalendarTabs />
            </TabPanel>
            <TabPanel value="4">
              <Statics />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
  );
}

export default App;
