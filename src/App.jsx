import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Login from './component/Login'
import Userpage from './pages/Userpage';
import Headers from './Header';
import Sidebar from './Sidebar';
import Category from './pages/Category';
import { ToastContainer ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './pages/ProductList';
import Inventary from './pages/Inventary';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  return (
    <div className='w-full overflow-hidden h-full'>

      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>

      <div className="flex flex-col">
      {/* Sidebar */}
      <div>
      {!isHomePage && !isLoginPage && <Sidebar />}

      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        {!isHomePage && !isLoginPage && <Headers />}
        
    
        <div className="flex-grow">
        
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/admin' element={<Dashboard/>} />
            <Route path='/user' element={<Userpage/>} />
            <Route path='/category' element={<Category/>} />
            <Route path='/product-list' element={<ProductList/>} />
            <Route path='/Inventary' element={<Inventary />} />
          </Routes>
        <ToastContainer/>
          
        </div>
      </div>
    </div>

    </div>
    
  );
}

export default App
