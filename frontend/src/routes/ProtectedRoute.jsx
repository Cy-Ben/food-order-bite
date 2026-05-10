import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth()

  // pas connecté
  if (!user) {
    return <Navigate to="/" />
  }

  // mauvais rôle
  if (role && user.role !== role) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute