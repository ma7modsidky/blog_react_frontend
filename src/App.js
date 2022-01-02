import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import './App.css';
import './assets/scss/globals.scss'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className="App">
      <Router basename='/'>
      <AuthProvider>
          <Header />
          <Main />
          <Footer />
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
