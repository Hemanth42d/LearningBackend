import React, { useState } from "react";
import axios from "axios";

const LoginApp = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [status, setstatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setstatus("");

    try {
      const res = await axios.post("https://localhost:3000/login", {
        email,
        setPwd,
      });

      if (res.data.success) {
        setstatus("Login Successful");
        localStorage.setItem("token", res.token.data);
      } else {
        setstatus(res.data.message);
      }
    } catch (err) {
      setstatus("Login Failed. Please try again");
      console.log(err);
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center mt-5">Login</h1>
      <div className="mt-10 flex items-center justify-center">
        <p className={"" ? "text-red-500" : ""} aria-live="assertive">
          {}
        </p>

        <form
          onSubmit={handleOnSubmit}
          className="flex items-start px-10 justify-center flex-col gap-5 border-2 w-[25vw] h-[48vh] rounded-md"
        >
          <label htmlFor="email" className="text-xl">
            Email :
          </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email adress"
            className="border-2 border-black-500 p-2 rounded-md w-full outline-none"
          />
          <label htmlFor="password" className="text-xl">
            Password :
          </label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter Password"
            className="border-2 border-black-500 p-2 rounded-md w-full outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 rounded-md w-full p-2 text-white font-medium cursor-pointer"
          >
            {loading ? "Loggin in..." : "Login"}
          </button>
        </form>
      </div>
      <p>{status}</p>
    </>
  );
};

export default LoginApp;
