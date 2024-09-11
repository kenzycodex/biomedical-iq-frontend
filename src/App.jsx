import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import ResetPassword from './pages/ResetPassword';
import ConfirmReset from './pages/ConfirmReset';
import Dashboard from './pages/Dashboard';

const Layout = ({ children }) => (
  <div className='min-h-screen flex flex-col'>
    <Header />
    <main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/confirm-reset' element={<ConfirmReset />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
