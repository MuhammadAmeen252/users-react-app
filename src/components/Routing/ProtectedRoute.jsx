import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute({ isAllowed, redirectTo = "/login", children }) {
 if (!isAllowed) {
  return <Navigate to={redirectTo} />
 }
 // We can define out Layout here, just for simplicity using this
 return children ? <div className="pl-20 pr-20 pt-10">{children}</div> : <Outlet />
}