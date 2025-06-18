import { useSelector } from "react-redux";
import Button from "./Button";

function User({ type }) {
  const userName = useSelector((store) => store.user.name);
  if (userName === "") return null;

  if (type === "content") {
    return (
      <div>
        <h4 style={{ paddingBottom: "20px" }}>
          Welcome
          <strong>
            <i> {userName}</i>
          </strong>{" "}
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
      <p style={{ textTransform: "lowercase" }}>
        Hello,
        <strong style={{ textTransform: "uppercase" }}>{userName}</strong>
      </p>
    </div>
  );
}

export default User;
