import { useSelector } from "react-redux";
import Button from "./Button";

function User({ type }) {
  const userName = useSelector((store) => store.user.name);
  if (userName === "") return null;

  if (type === "content") {
    return (
      <div>
        <h4 className="p-5">
          Welcome
          <strong>
            <i className="px-1">{userName}</i>
          </strong>
          Shoot your order🔫
        </h4>
        <Button type="primary" to="/menu">
          Shop Menu
        </Button>
      </div>
    );
  }
  return (
    <div>
      <p className="sm:block hidden">
        Hello,
        <strong className="uppercase">{userName}</strong>
      </p>
    </div>
  );
}

export default User;
