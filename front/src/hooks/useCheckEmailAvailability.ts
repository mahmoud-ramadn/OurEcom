import { useState } from "react";
import axios from "axios";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";




const useCheckEmailAvailability = () => {

    const [emailAvailabilityStatus, setEmailAvailabilityStatus]=
    useState<TStatus>("idle");

    const [enteredEmail, setEnteredEmail] = useState<string | null>(null);


    const checkEmailAvailability = async (email:string )=>{
        setEnteredEmail(email);
        setEmailAvailabilityStatus("checking");

        try {
            const res = await axios.get(`/users?email=${email}`);
            if (!res.data.length) {
                setEmailAvailabilityStatus('available')
                
            } else {
                setEmailAvailabilityStatus("notAvailable")

            }




        } catch (error) {
            console.log(error);
            
            setEmailAvailabilityStatus("failed")
        }




    }

    const resetCheckEmailAvailability = () => {
        setEmailAvailabilityStatus("idle");
        setEnteredEmail(null);
      };
    







    return {
        checkEmailAvailability,
        emailAvailabilityStatus,
        enteredEmail,
        resetCheckEmailAvailability
    }
}

export default useCheckEmailAvailability

