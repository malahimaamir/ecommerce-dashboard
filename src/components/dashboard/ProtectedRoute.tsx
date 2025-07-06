import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
        setLoading(false);
      } catch (err) {
        navigate("/auth");
      }
    };

    checkSession();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
