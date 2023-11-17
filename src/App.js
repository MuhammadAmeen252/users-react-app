import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home, Login } from "./pages"
import { Nav, ProtectedRoute } from "./components"
import "./App.css"
import { useSelector } from "react-redux"

function App() {
  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to='/home' /> : <Login />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to='/home' /> : <Login />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectTo='/login'>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App