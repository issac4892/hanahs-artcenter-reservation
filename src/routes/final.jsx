import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './styles/main.scss'
import './styles/final.scss'

export default function FinalPage() {
    const navigate = useNavigate()
    const [able, setable] = useState(true) // 0: able 1: 통로 2: unable
    const [ishall, setishall] = useState(false)
    let [seat, setseat] = useState(undefined)

    useEffect(()=> {
        const url = window.location.href
        const arr = url.split("/")
        if(arr[arr.length-1] == '') setseat(arr[arr.length-2])
        else setseat(arr[arr.length-1])
        axios.get('https://ticket.algorix.io/v1/reservation/').then(r => {
            const data = r.data.reserved
            for(let i=0;i<data.length;i++) {
                if(Object.keys(data[i]) == seat) {
                    setable(false)
                    if(data[i][Object.keys(data[i])]=='통로') {
                        setishall(true)
                    }
                }
            }
        })
    }, [])
    return (
        <div>
        {
            able ? <div>예매하기</div> : <div className="container2">
                <h1>해당 좌석을 예매할 수 없습니다.</h1>
                {
                    ishall ? <p>예매하려고 하신 좌석은 통로입니다.</p> : <p>예매하려고 하신 좌석은 이미 선택되었습니다.</p>
                }

                <hr style={{border: "2px white solid"}} />
                <button className="blackb" onClick={()=>navigate("/")}>처음으로</button>
            </div>
        }
        </div>
    )
}