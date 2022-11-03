import './App.css';
import {LoginWithRouter} from './components/auth/login/Login'
import {SignUpWithRouter} from './components/auth/signup/SignUp'
import {ReportWithRouter} from './components/report/Report'
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>          
            <Route path="/login" element={<LoginWithRouter/>} />
            <Route path="/signup" element={<SignUpWithRouter />} />
            <Route path="*" element={<ReportWithRouter />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
