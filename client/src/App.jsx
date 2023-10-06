import axios from 'axios'
import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Register from './pages/Register'


axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080'
axios.defaults.withCredentials = true

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				
				
			</Routes>
		</>
	)
}

export default App
