import { Suspense } from "react"
import LottieHandler from "../LottiesHandler/LottieHandler"






const PageSupenseFallback = ({children}: { children:React.ReactNode}) => {
    return (
        <Suspense
            fallback={
                <LottieHandler type="loading" message="loading please wait .." />
            }
        >
{children}
      </Suspense>


  )
}

export default PageSupenseFallback