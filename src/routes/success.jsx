import {useEffect} from "react";
import './styles/main.scss'
import './styles/status.scss'
import {useNavigate} from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = '예매 성공 | 하나아트센터 예매'
    }, [])

    return (
        <div className="container1">
            <div className="vertical-center">
                <svg viewBox="181.439 119.222 255.335 255.335" width="140" height="140">
                    <path d="M 309.106 119.222 C 238.602 119.222 181.439 176.385 181.439 246.889 C 181.439 317.394 238.602 374.557 309.106 374.557 C 379.611 374.557 436.774 317.394 436.774 246.889 C 436.774 176.385 379.611 119.222 309.106 119.222 Z M 298.467 300.084 L 245.273 243.708 L 260.157 228.495 L 298.18 268.242 L 368.099 193.695 L 383.579 208.621 L 298.467 300.084 Z" style={{fill: "#20A494"}}></path>
                </svg>
                <br />
                <br />
                <br />
                <h1>예매에 성공했습니다.</h1>
                <br />
                <button className="blackb" onClick={()=>navigate('/')}>처음으로</button>
            </div>
        </div>
    );
}
