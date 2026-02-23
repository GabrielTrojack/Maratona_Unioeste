import { useAuth } from "../context//AuthContext";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";

const AuthGate = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthGate;