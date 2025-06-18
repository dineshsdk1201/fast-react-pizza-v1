import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "./UserSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username && email) {
      dispatch(createAccount(username, email));
      navigate("/menu");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {username !== "" && email !== "" && (
        <div>
          <Button onClick={handleSubmit} type="primary">
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
