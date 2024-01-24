// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './context/Main.tsx'
import './App.css'

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/*' element={<Main />}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
