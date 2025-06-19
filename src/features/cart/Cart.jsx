import { Link, useSearchParams } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import { deleteCart } from "./CartSlice";
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const userName = useSelector((store) => store.user.name);
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cart);

  return (
    <div className="px-4 py-3">
      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      <div>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
        {cart.length === 0 && <EmptyCart />}
      </div>
      <div className="mt-7 text-xl font-semibold mx-2 flex gap-2 items-center">
        <Button to="/order/new" type="small">
          Order pizzas
        </Button>
        <LinkButton
          onClick={() => {
            dispatch(deleteCart());
          }}
        >
          Clear cart
        </LinkButton>
      </div>
    </div>
  );
}

export default Cart;
