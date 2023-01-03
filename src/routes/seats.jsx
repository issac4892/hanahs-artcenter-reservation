import './styles/seats.scss'
import {useState} from "react";

export default function SeatPage() {
    const row = "ABCDEFGHIJKLMNOPQRSTU".split("")

    /* seat selection, A~U, 1~33, seat id starts 1 at A1.
        *  available: black square, no background, text like A1, "A1: 예약 가능" on hover
        *  reserved: grey square, grey background, text like A1, "A1: 예약 불가" on hover
        *  seats reserved by "통로" are not shown
        *  when a seat is clicked, go to confirm page (ex. /confirm/A1)
        *  use map function to generate seats
        *  GET https://ticket.algorix.io/v1/reservation for seat info
        *
         */
    const [info, setinfo] = useState(undefined)
    const renderseat  = () => {
        const temp = []
        for(let i=0;i<row.length;i++) {
            for(let j=1;j<=33;j++) {
                if(j==11||j==25) {
                    temp.push(`<div className="empty"></div>`)
                }
                if(false) {
                    temp.push(`<div className="seatclose">row[i]+j</div>`)
                } else temp.push(`<div className="seatopen">row[i]+j</div>`)

            }
        }
        return temp
    }
    return (
        <div className="container6">
            <h1>좌석 선택</h1>
            <br/>
            <div className="seatarea">
                {renderseat()}
            </div>

        </div>
    )
}
