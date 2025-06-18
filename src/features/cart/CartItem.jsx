import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { decreaseQuantity, deleteItem, increaseQuantity } from "./CartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { pizzaId, name, quantity, totalPrice } = item;
  function handleDeleteItem(id) {
    dispatch(deleteItem(id));
  }

  function handleIncrease(id) {
    dispatch(increaseQuantity(id));
  }
  function handleDecrease(id) {
    if (quantity > 1) {
      dispatch(decreaseQuantity(id));
    } else {
      dispatch(deleteItem(id));
    }
  }
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small" onClick={() => handleDecrease(pizzaId)}>
          <strong>-</strong>
        </Button>
        <Button type="small" onClick={() => handleDeleteItem(pizzaId)}>
          Delete
        </Button>
        <Button type="small" onClick={() => handleIncrease(pizzaId)}>
          <strong>+</strong>
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
