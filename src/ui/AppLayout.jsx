import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { getCartLength } from "../features/cart/CartSlice";
function AppLayout() {
  const navigation = useNavigation();
  const ValidCart = useSelector(getCartLength);
  console.log(ValidCart);
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      {!ValidCart ? "" : <CartOverview />}
    </div>
  );
}

export default AppLayout;
