import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import store from "../store";
import User from "./User";

function Home() {
  const name = useSelector((store) => store.user.name);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {name === "" ? <CreateUser /> : <User type="content" />}
    </div>
  );
}

export default Home;
