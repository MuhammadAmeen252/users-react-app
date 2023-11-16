import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Login } from "./pages"
import { Nav, ProtectedRoute } from "./components"
import "./App.css"
import { useSelector } from "react-redux"

function App() {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute isAllowed={user} redirectTo='/login'>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App