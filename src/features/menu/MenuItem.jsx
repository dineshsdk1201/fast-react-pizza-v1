import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem } from "../cart/CartSlice";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cart);
  // console.log(cart.map((c) => c.pizzaId));
  const cartIds = cart.map((c) => c.pizzaId);
  console.log(cartIds);
  console.log(typeof cart);

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const check = cartIds.includes(id);

  function handleAddCart() {
    console.log(id);
    const NewItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(NewItem));
  }

  function handleDeleteItem(id) {
    console.log(id);
    dispatch(deleteItem(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
        </div>
      </div>
      {!soldOut && !check && (
        <Button type="primary" onClick={() => handleAddCart(id)}>
          Add to cart
        </Button>
      )}
      {check && (
        <Button type="small" onClick={() => handleDeleteItem(id)}>
          Delete
        </Button>
      )}
    </li>
  );
}

export default MenuItem;
