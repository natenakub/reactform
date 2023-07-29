import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function BootstrapForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [item, setItem] = useState(1);
  const [data, setData] = useState("");
  const textUsername = useRef();
  const selectItem = useRef();

  function isValidEmail(email) {
    return /\S+@\S+.\S+/.test(email);
  }

  const checkEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailError("Is not Email");
    } else {
      setEmailError("");
      setEmail(e.target.value);
    }
  };

  const checkItem = () => {
    setItem(selectItem.current.value);
  };

  const checkUsername = () => {
    if (textUsername.current.value.length >= 4) {
      setUsername(textUsername.current.value);
      setUsernameError("");
    } else {
      setUsernameError("Username Length More than 4");
      setUsername("");
    }
  };

  const submitData = () => {
    setData(username + " " + email + " " + item);
  };

  return (
    <form>
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        class="form-control"
        ref={textUsername}
        onChange={checkUsername}
        required
      ></input>
      <h6 class="text-danger">{usernameError}</h6>

      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        class="form-control"
        required
      ></input>

      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        class="form-control"
        required
        onBlur={checkEmail}
      ></input>
      <h6 class="text-danger">{emailError}</h6>

      <label htmlFor="select1" className="form-label">
        Select
      </label>
      <select
        className="form-select"
        name="select1"
        id="select1"
        ref={selectItem}
        onChange={checkItem}
      >
        <option value="1">item1</option>
        <option value="2">item2</option>
        <option value="3">item3</option>
      </select>

      <Button type="button" className="my-3" onClick={submitData}>
        Submit
      </Button>

      <h4 class="text-primary">{data}</h4>
    </form>
  );
}

// function HookForm() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const firstName = watch("firstName");
//   const lastName = watch("lastName");
//   const [data, setData] = useState("");
//   return (
//     <form onSubmit={handleSubmit((data)=> {
//       setData(firstName + " " +lastName);
//     })}>
//       <input
//         type="text"
//         class="form-control"
//         {...register("firstName", { required: "Input firstName" })}
//         placeholder="firstName"
//       ></input>
//       <p>{errors.firstName?.message}</p>
//       <input
//         type="text"
//         class="form-control"
//         {...register("lastName", {
//           required: "Input lastName",
//           minLength: { value: 4, message: "minLength more than 4" },
//         })}
//         placeholder="lastName"
//       ></input>
//       <p>{errors.lastName?.message}</p>
//       <input type="submit">Submit</input>
//       <h4>{data}</h4>
//     </form>
//   );
// }

function HookForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const [data, setData] = useState("");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setData(firstName + " " + lastName);
      })}
    >
      <input
        type="text"
        {...register("firstName", { required: "ต้องใส่ข้อมูลในช่องนี้" })}
        placeholder="First Name"
      ></input>
      <p>{errors.firstName?.message}</p>
      <input
        type="text"
        {...register("lastName", {
          required: "ต้องใส่ข้อมูลในช่องนี้",
          minLength: { value: 4, message: "ต้องมีความยาว 4 ตัวอักษรขึ้นไป" },
        })}
        placeholder="Last Name"
      ></input>
      <p>{errors.lastName?.message}</p>
      <input type="submit" />
      <h4>{data}</h4>
    </form>
  );
}

function App() {
  return (
    <Container className="my-3">
      <BootstrapForm></BootstrapForm>
      <HookForm></HookForm>
    </Container>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
