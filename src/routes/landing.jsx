import './styles/main.scss'
import './styles/landing.scss'
import {useNavigate} from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className='container'>
            <div className="titlearea">
                <h1>하나아트센터</h1>
                <h1>좌석 예매</h1>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="buttonarea">
                <button className="blackb" onClick={()=> navigate("/seats")}>예매 시작하기</button> <hr style={{border: "white", margin: "2px"}}/>
                <button className="blackb" onClick={()=> navigate("/cancel")}>예매 취소하기</button>
            </div>

        </div>
    )
}
