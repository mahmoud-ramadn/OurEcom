import Heading from "@components/common/Heading/Heading"
import { useAppSelector } from "@store/hook"

const Profile = () => {
const {user}=useAppSelector(state=>state.auth)

    return (
        <>
            <Heading title="your account info" />
            <ul>
            <li>First Name: {user?.firstName}</li>
        <li>Last Name: {user?.lastName}</li>
        <li>Email: {user?.email}</li>
            </ul>
        
        </>
  )
}

export default Profile