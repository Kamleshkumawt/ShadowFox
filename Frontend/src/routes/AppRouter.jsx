import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../screens/Home'
import Navbar from '../components/Navbar'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<h1>About</h1>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter