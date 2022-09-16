import React from 'react'
import { useRef, useState, useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
import base64 from 'base-64';
import AuthContext from '../context/Auth'
function Login() {
    const LOGIN_URL ="https://hiservice-murad.herokuapp.com/users/login"
    const {setAuth}=useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()

    let navigate=useNavigate()

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])
    useEffect(() => {
        setErrMsg('')
    }, [username, password])

function handleChange(e){
    let name = e.target.value
    setUserName(name)
}
function handleChangePassword(e){
    let password = e.target.value
    setPassword(password)
}
const handleSubmit = async (e) => {
e.preventDefault()
try {
     
    let response = await superagent.post(LOGIN_URL).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`)
    
    console.log(response.body,"11111111");
    let token = response?.body.token;
    let role = response?.body.role;

    setAuth({ username,password,role,token})
    setUserName('')
    setPassword('')
    setSuccess(true)
} catch (error) {
    if(!error?.response){
        setErrMsg('server not responding')
    }
    else if (error.response?.status===400){
        setErrMsg('username or password incorrect')
    }
    else if (error.response?.status===403){
        setErrMsg('User Unauthenticated')
    }
    else {
        setErrMsg('Invalid login ')
    }
    errRef.current.focus()
}



}

    return (
<>

{success ? (

<section> 

<h1> You are logged In </h1>
<p>
    <a href="#" > you are logged in</a>
</p>

</section>
):(


        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1> Sign In</h1>

            <form >
                <label htmlFor='username' > Username </label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={handleChange}
                    value={username}
                    required  

                />
                <label htmlFor='password'>Password </label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    onChange={handleChangePassword}
                    value={password}
                    required  

                />
                <button onClick={handleSubmit} >Sign in  </button>

            </form>
            <p>
                Need an account ? <br/>
                <span className='line'></span>
                <button onClick={()=> navigate('/signup')} >Sign up</button>
            </p>
        </section>
)}
        </>

    )
}

export default Login