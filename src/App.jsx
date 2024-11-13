import { AppBar, Container, Toolbar, CssBaseline, Tabs, Tab } from '@mui/material'
import Typography from '@mui/material/Typography';
import './App.css'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

function App() {
  // const [selectedTab, setSelectedTab] = useState(0); 

  // const handleTabChange = (event, newValue) => {
  //   setSelectedTab(newValue); 
  // };

  return (
    <Router>
      <Container maxWidth="xl">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h4'>Best trainers</Typography>
            <Tabs>
              <Tab label="Customers" component={Link} to="/customers" />
              <Tab label="Trainings" component={Link} to="/trainings" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path='/customers' element={<CustomerList />} />
          <Route path='/trainings' element={<TrainingList />} />
        </Routes>
        <CssBaseline />
      </Container>
    </Router>
  );
}

export default App
