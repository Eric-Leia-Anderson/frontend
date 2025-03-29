import { useState } from "react"


const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setConfirmPassword] = useState('')


  

  return (
    <form className="signup" >
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <label>Confirm Password:</label>
      <input 
        type="password" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        value={password} 
      />

      <button>Sign up</button>
      
    </form>
  )
}

export default SignupPage