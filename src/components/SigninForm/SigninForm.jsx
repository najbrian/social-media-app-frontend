import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <p className="text-red-600">{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className='rounded-lg shadow-lg border relative'>
          <div>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-400 rounded-sm m-1 p-2"
            />
          </div>
          <div>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="border border-gray-400 rounded-sm m-1 p-2"
            />
          </div>
          <div className="">
            <button className="">Log In</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SigninForm;
