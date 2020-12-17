import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Stack, HStack, VStack, StackDivider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

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
        <Box maxW="500px" mx="auto" marginTop="5%">

        <VStack align="stretch" spacing={4} >

                {isLoggedIn === true ? 
                <Redirect to="/main" /> : 
                <Center flex="4" size="lg"> Create an Account
                </Center>
                }

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
            <Center>

                <Button variant="ghost">
                    <Link to="/">Go Back to Login</Link>
                </Button>
            </Center>
            <p>{errorMsg}</p>
        </VStack>
        </Box>
       
    )
}

export default SignUp;