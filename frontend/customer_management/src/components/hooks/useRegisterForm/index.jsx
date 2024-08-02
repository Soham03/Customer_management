import { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";

const useRegisterForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleRegister = async (email, password) => {

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return { isRegistering, errorMessage, handleRegister,setErrorMessage };
};

export default useRegisterForm;
