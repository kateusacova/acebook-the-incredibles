import React, { useState } from 'react';
import "./signUpForm.css";

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>
        <p>Sign up to Acebook</p>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <br />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <br />
          <input id='submit' type="submit" value="Submit" />
          <br />
          <div class="footer">
           <p>Ⓒ The Incredibles</p>
          </div>
      </form>
    );

    
}

export default SignUpForm;