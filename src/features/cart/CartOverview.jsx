import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartOverview() {
  const cart = useSelector((store) => store.cart);
  console.log(cart);
  const totalPizzas = cart.cart.length;
  const totalCount = cart.cart.reduce((sum, item) => item.quantity + sum, 0);
  console.log(totalCount);
  const totalPrice = cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {totalPizzas} pizzas({totalCount})
        </span>
        <span>${totalPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
