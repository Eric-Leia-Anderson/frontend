import {useState} from 'react'

const LoginPage = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form className="login" >
      <h3>Log In</h3>
      
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

      <button>Log in</button>

    </form>
    );
}

export default LoginPage