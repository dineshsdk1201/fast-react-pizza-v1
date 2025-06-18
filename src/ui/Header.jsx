import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "./User";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/">Fast-react-pizza</Link>
      <SearchOrder />
      <User type="header" />
    </div>
  );
}

export default Header;
