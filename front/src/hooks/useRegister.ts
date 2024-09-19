import { useEffect } from "react"
import { useAppDispatch ,useAppSelector} from "@store/hook"
import { useNavigate } from "react-router-dom";
import { actAuthRegister, restUI } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from '@validations/signUpSchema';
import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability';





const useRegister = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    const {accessToken,error,loading}=useAppSelector(state=>state.auth)


    const {
        register,
        handleSubmit,
        getFieldState,
        trigger,
        formState: { errors:formErrors }
      } = useForm<signUpType>({
        mode: 'onBlur',
        resolver: zodResolver(signUpSchema)
      });
    
    const submitForm: SubmitHandler<signUpType> = async (data) => {
        const { firstName, lastName, email, password } = data;
        dispatch(actAuthRegister({ firstName, lastName, email, password }))
            .unwrap().then(()=>navigate("/login?message=account_created"))
    }
    
    const {
        checkEmailAvailability,
        enteredEmail,
        emailAvailabilityStatus,
        resetCheckEmailAvailability
    
      } = useCheckEmailAvailability();
    
    
      const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    
        await trigger('email');
        const value = e.target.value;
        const { isDirty, invalid } = getFieldState("email");
        if (isDirty && !invalid && enteredEmail !== value) {
          checkEmailAvailability(value)
        }
        if (isDirty && invalid && enteredEmail) {
          resetCheckEmailAvailability();
        }
      }
    
    
    useEffect(() => {
        dispatch(restUI())
    },[dispatch])
    
    
    
    
    
    
    





  return {
        emailAvailabilityStatus, register, formErrors,
      emailOnBlurHandler, submitForm, handleSubmit,
      error,
            loading,accessToken
        
  }
}

export default useRegister