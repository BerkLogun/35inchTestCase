import './App.css'

import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Routes} from 'react-router-dom'

import HomeScreen from './Screens/HomeScreen'
import CreateScreen from './Screens/CreateScreen'
import Dashboard from './Screens/Dashboard'
import UpdateScreen from './Screens/UpdateScreen'


import Header from './components/Header'
import Footer from './components/Footer'


import {Container} from 'react-bootstrap'

function App() {
  return (
    <Router>
      <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/create" element={<CreateScreen />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/update/:id" element={<UpdateScreen/>}/>
            </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
