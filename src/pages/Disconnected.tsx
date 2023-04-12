import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";

const Disconnected = () => {
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-3xl mt-32">
      Connection to server failed
      <Button
        sx={{ mt: "1rem" }}
        variant="contained"
        onClick={() => (window.location.href = "/")}
      >
        Try again
      </Button>
    </div>
  );
};

export default Disconnected;
