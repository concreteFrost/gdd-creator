import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/");
  }
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={handleNavigate}>Back</button>
    </div>
  );
}

export default NotFoundPage;
