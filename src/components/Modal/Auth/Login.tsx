import React, { useState } from "react";

type LoginProps = {

};

const Login:React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email:""
  })
  return(
      <form>
        {}
      </form>
  )
}
export default Login;