import { useState } from 'react';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';

const useLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailSignIn = async (email,password) => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                // Handle successful login
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isSigningIn,
        errorMessage,
        handleEmailSignIn,
        onGoogleSignIn,
    };
};

export default useLoginForm;