import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import '../styles/login.scss'
// import inputs like in login page

function SignUp() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/users/createAccount',
            data: {
                email: email,
                pass: password
            }
        })
        .then((response) => {
            console.log('the response from signin is', response)
            if (response.status === 200) {
                console.log("we've reached the response status 200");
                //redirect to Main using react route link
                setIsLoggedIn(true);
            }
        })
        .catch(err => {
            if (err) {
                setErrorMsg('Email already exists');
                setEmail('');
                setPassword('');
            }
        })
    }

    return (
        <div className='signUp'>
            {/* is loggedIn === true --> redirect */}
            {isLoggedIn === true ? 
                <Redirect to="/main" /> : 
                <h1>Create account</h1>
            }
            <form onSubmit={handleSubmit}>
                <label className='label email'>Email:
                    <Input className='input' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }}></Input>
                </label>
                <label className='label'>Password:
                    <Input  className='input' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></Input>
                </label>
                <Input className='submit' type="submit" value="Sign Up">

            {/* is loggedIn === true --> redirect */}
            <form onSubmit={handleSubmit}>
                <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                >
                    <Input size="md" placeholder="Email" variant="border" type="text" value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                    <Input size="md" placeholder="Password" variant="border" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <Input size="md"  variant="filled" type="submit" value="Create Account" />
                </VStack>
                
            </form>
            <Link to="/" className='loginLink'>Login</Link>
            <p>{errorMsg}</p>
        </VStack>
        </Box>
       
    )
}

export default SignUp;