import React, { useState } from "react";
import "./signUpForm.css";
import Footer from "../footer/footer";
import { UploadProfileImage } from "../UploadImage/UploadImage";

const SignUpForm = ({ navigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setImage(null);

    if (image !== null) {
      UploadProfileImage(image).then((url) => {
        fetchApi(url);
      });
    } else {
      fetchApi(null);
    }
  };

  const fetchApi = (url) => {
    fetch("/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        img: url,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/");
      } else {
        navigate("/signup");
        document.querySelector(".signUpErrorMessage").style.display = "block";
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="register-background">
      <h1 className="register-logo">spybook &#129464;</h1>

      <p className="register-login">
        {" "}
        Already have an account? <a href="/">Log in</a>{" "}
      </p>

      <h1 className="register-quote">
        Join the world's greatest superheroes today
      </h1>

      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <div className="signUpErrorMessage">
            Sign up details are incorrect.
          </div>
          <input
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <input
            placeholder="Email address"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <div className="set-user-image">
            <input
              type="file"
              id="userImage"
              name="filename"
              onChange={handleImageChange}
            />
            <span> Upload your profile picture</span>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default SignUpForm;
