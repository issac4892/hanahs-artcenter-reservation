import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './styles/main.scss'
import './styles/confirm.scss'

const lines = "ABCDEFGHIJKLMNOPQRSTU".split("")

export default function ConfirmPage() {
    const navigate = useNavigate()
    const [able, setable] = useState(true)
    const [ishall, setishall] = useState(false)
    const { seatId } = useParams()
    const numbertoseat = (num) => {
        let row = Math.floor(num / 33)
        let col = num % 33
        return lines[row] + col
    }
    const submit = async (e) => {
        e.preventDefault()
        let data = {
            name: e.target.name.value,
            pin: e.target.pin.value,
            student_id: e.target.student_id.value,
            neis_id: e.target.neis_id.value,
            study_floor: e.target.study_floor.value,
            study_seat: e.target.study_seat.value,
            artcenter_seat: e.target.artcenter_seat.value
        }
        let resp = await axios.post("https://ticket.algorix.io/v1/reservation", {}, {
            params: data
        })
        if (resp.data.result === "success") {
            navigate("/success")
        } else {
            navigate("/error")
        }
    }
    const [user, setuser] = useState(undefined)
    useEffect(()=> {
        axios.get('https://ticket.algorix.io/v1/reservation/').then(r => {
            const data = r.data.reserved
            for(let i=0;i<data.length;i++) {
                if(Object.keys(data[i]) == seatId) {
                    setuser(data[i][Object.keys(data[i])])
                    console.log(user)
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
            able ? <div className="container2">
                <h1>{numbertoseat(seatId)} 예매하기</h1>
                <br/>
                <form onSubmit={(e) => {

                }}></form>
            </div> : <div className="container2">
                <h1>해당 좌석을 예매할 수 없습니다. ({numbertoseat(seatId)})</h1>
                {
                    ishall ? <p>선택하신 좌석은 통로입니다.</p> : <p>선택하신 좌석은 {user} 학생이 이미 예매하였습니다.</p>
                }

                <hr style={{border: "2px white solid"}} />
                <button className="blackb" onClick={()=>navigate("/")}>처음으로</button>
            </div>
        }
        </div>
    )
}
