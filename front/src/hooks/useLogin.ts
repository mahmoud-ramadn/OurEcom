
import { zodResolver } from "@hookform/resolvers/zod"
import { actAuthLogin, restUI } from "@store/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@store/hook"
import { signInSchema, signInType } from "@validations/signInSchema"
import { useEffect } from "react"
import {useForm ,SubmitHandler } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"


const useLogin = () => {
      const navigate=useNavigate()
    const dispatch = useAppDispatch();
    const {error,loading,accessToken } = useAppSelector(state => state.auth);





    const [SearchParams,setSearchParams] = useSearchParams();



    const { register, handleSubmit, formState: { errors:formErros} } = useForm<signInType>({
        mode: 'onBlur',
        resolver:zodResolver(signInSchema)
      })
    
    
      const submitForm:SubmitHandler<signInType>=async (data) => {
          if (SearchParams.get('message')) {
              setSearchParams("")
          }
          dispatch(actAuthLogin(data)).unwrap().then(()=>navigate('/'))
        
      }
    
    useEffect(() => {
         dispatch(restUI())
     },[dispatch])
    


    return {
        error, loading,
        accessToken,
        register, handleSubmit, formErros,
        submitForm,
        SearchParams
  }
}

export default useLogin