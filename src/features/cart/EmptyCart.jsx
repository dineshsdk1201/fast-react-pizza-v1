import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   gap: "20px",
      //   marginTop: "10px",
      // }}
      className="flex flex-col gap-1 mt-3"
    >
      <Link to="/menu">&larr; Back to menu</Link>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
