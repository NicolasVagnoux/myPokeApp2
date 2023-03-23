import './App.scss'
import Home from './components/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { TeamContextProvider } from './contexts/TeamBuilder';
import { ToastContainer } from 'react-toastify';
import TypePage from './components/TypePage';
import BuilderPage from './components/BuilderPage';

function App() {

  return (
    <div className="App">
      {/* <TeamContextProvider> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/types' element={<TypePage />} />
            <Route path='/builder' element={<BuilderPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      {/* </TeamContextProvider> */}
    </div>
  )
}

export default App
