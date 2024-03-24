import { useAppContext } from "../../context"
import "./home_content.css"


export default function Home() {
    const { user } = useAppContext()
    console.log(user.user)
    return (
        <div className="content">home</div>
    )
}
