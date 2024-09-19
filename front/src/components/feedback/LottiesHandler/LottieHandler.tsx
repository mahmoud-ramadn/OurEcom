import Lottie from "lottie-react"
import empty from '@assets/Lotties/empty.json';
import loading from "@assets/Lotties/loading.json";
import error from '@assets/Lotties/error.json';
import notFound from '@assets/Lotties/notFound.json'
import success from "@assets/Lotties/success.json"

const lottieFilesMap = {
    empty, error, loading,
    notFound,
    success
}


type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
    className?: string;
}



const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
    const lottie = lottieFilesMap[type];

    const messageStyles =
       type==='error'  ? {fontSize:"19px",color:'red'}:{ fontSize:"19px", marginTop:"30px"}
    



    return (
        <div className={`d-flex flex-column align-items-center ${className}`}>
            <Lottie animationData={lottie} style={{ width: '400px' }} />
            
            {messageStyles && <h3  style={messageStyles}>{message}</h3>}


        </div>
    )
}

export default LottieHandler