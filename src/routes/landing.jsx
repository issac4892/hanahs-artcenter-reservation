import './styles/main.scss'
import {useNavigate} from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div>
            Hello world!
        </div>
    )
}
