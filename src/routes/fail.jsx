import {useEffect} from "react";
import './styles/main.scss'
import './styles/status.scss'
import {useNavigate} from "react-router-dom";

export default function FailPage() {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = '예매 실패 | 하나아트센터 예매'
    }, [])

    return (
        <div className="container1">
                <svg fill="#ffffff" height="140px" width="140px"
                     viewBox="-225.78 -225.78 912.34 912.34"  stroke="#ffffff"
                     stroke-width="23.9603"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-225.78" y="-225.78" width="912.34" height="912.34" rx="456.17" fill="#ea5353" strokeWidth="0"></rect></g>
                    <g id="SVGRepo_iconCarrier"> <path
                        d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
                <br />
                <br />
                <br />
                <h1>예매에 실패했습니다.</h1>
                <br />
                <button className="blackb" onClick={()=>navigate('/')}>처음으로</button>
        </div>
    );
}
