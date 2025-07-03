import { useState } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../cart/CartSlice";
import store from "../../store";
import { fetchAddress } from "../user/UserSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { name, position, address } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  // const cart = fakeCart;
  const cart = useSelector((store) => store.cart.cart);
  const noCart = cart.length < 0;

  const formerrors = useActionData();
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  // console.log(formerrors?.phone);

  // function h() {
  //   console.log("fetch address");
  //   dispatch(fetchAddress());
  // }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={name}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formerrors?.phone ? (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                Enter valid phone
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
            />
          </div>
          {!address && (
            <Button
              onClick={(e) => {
                e.preventDefault();

                dispatch(fetchAddress());
              }}
              type="small"
            >
              Get Location
            </Button>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? JSON.stringify(position)
                : ""
            }
          />
          <Button
            disabled={isSubmitting}
            type={cart.length ? "primary" : "secondary"}
            isCart={noCart}
          >
            {isSubmitting ? "Placing Order" : "Order now"}
          </Button>

          <p style={{ color: cart.length >= 1 ? "green" : "red" }}>
            {cart.length === 0
              ? "Add atleast one pizza to put the order"
              : "Good to go👉"}
          </p>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  console.log(data);
  const sdk = JSON.parse(data.position);
  console.log(sdk);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);
  let errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Phone Number not valid, pls enter a valid phone number";
    return errors;
  }

  if (!Object.keys(errors).length > 0) {
    const newOrder = await createOrder(order);

    //Do Not overuse
    store.dispatch(deleteCart());

    return redirect(`/order/${newOrder.id}`);
  }
}

export default CreateOrder;
