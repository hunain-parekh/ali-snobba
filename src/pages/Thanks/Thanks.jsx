import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./thanks.css";

const Thanks = () => {
  const navigate = useNavigate();

  const handleCart = () => {
      fetch("http://localhost:8081/api/cart/all", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting cart: ", error);
        });
  };

  return (
    <div className="thanks-main">
      <img
        src="https://raw.githubusercontent.com/jeff-lent/Alisnobba/main/Capstone/Logo.png"
        className="App-logo"
        alt="logo"
      />
      <div>
        <h1 className="thanks">THANKS</h1>
        <h1>For Your Order</h1>
        <Button className="btn-primary" onClick={handleCart}>
          START OVER
        </Button>
      </div>
    </div>
  );
};

export default Thanks;
