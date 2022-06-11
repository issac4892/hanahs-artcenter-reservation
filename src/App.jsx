import './App.scss';
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const alph = "ABCDEFGHIJKLMNOPQRSTU".split("");

export default function App() {
    let ref = useRef(null);
    let [seats, setSeats] = useState(undefined);

    let [xv, setXv] = useState(undefined);
    let [xr, setXr] = useState(undefined);
    let [xc, setXc] = useState(undefined);

    useEffect(() => { loadData() }, []);

    const loadData = async () => {
        let tmp = new Array(21).fill(0).map(v => new Array(33).fill(null));

        let resp = await axios.get("http://141.164.56.240:8000/v1/reservation");
        let { reserved } = resp.data;

        for (let res of reserved) {
            let key = Object.keys(res)[0] - 1;

            let r = Math.floor(key / 33);
            let c = key % 33;

            tmp[r][c] = res[key + 1] === "통로" ? undefined : res[key + 1] ?? null;
        }

        setSeats(tmp);
    }

    const scroll = (index) => ref.current.scrollTo(index);

    const clickedSeat = (v, r, c) => {
        if (v === 0) return;

        setXv(v);
        setXr(r);
        setXc(c);

        scroll(1);
    }

    const completed = (e) => {
        setXv(undefined);
        setXr(undefined);
        setXc(undefined);

        scroll(0);
    }

    const requestSeat = async (e) => {
        e.preventDefault();

        if (xv === 1) {
            let name = e.target.name.value;
            let pin = e.target.pin.value;
            let student_id = e.target.student_id.value;
            let neis_id = e.target.neis_id.value;
            let study_floor = e.target.study_floor.value;
            let study_seat = e.target.study_seat.value;

            if (name.length === 0) return alert("이름을 입력해주세요.");
            if (pin.length === 0) return alert("PIN을 입력해주세요.");
            if (student_id.length === 0) return alert("학번을 입력해주세요.");
            if (neis_id.length === 0) return alert("NEIS 학번을 입력해주세요.");
            if (study_floor.length === 0) return alert("면학실 층수를 입력해주세요.");
            if (study_seat.length === 0) return alert("면학실 좌석 번호를 입력해주세요.");

            axios.post("http://141.164.56.240:8000/v1/reservation", {}, {
                params: {
                    name, pin, student_id, neis_id,
                    study_floor: Number(study_floor),
                    study_seat: Number(study_seat),
                    artcenter_seat: xr * 33 + xc + 1
                }
            })
                .then((resp) => { alert(resp.data.message); completed(e); })
                .catch((err) => alert(err.response.data.message))
                .finally(loadData);
        }
        else {
            let pin = e.target.pin.value;

            if (pin.length === 0) return alert("PIN을 입력해주세요.");

            axios.delete("http://141.164.56.240:8000/v1/reservation", { params: { pin, artcenter_seat: xr * 33 + xc + 1 } })
                .then((resp) => { alert(resp.data.message); completed(e); })
                .catch((err) => alert(err.response.data.message))
                .finally(loadData);
        }
    }

    return (
        <Parallax ref={ref} pages={2}>
            <ParallaxLayer className="view" offset={0} speed={2} style={{ backgroundColor: "#0c8176" }} />

            <SeatView seats={seats} loadData={loadData} clickedSeat={clickedSeat} />
            <SeatForm v={xv} r={xr} c={xc} scroll={scroll} requestSeat={requestSeat} />
        </Parallax>
    );
}

function SeatView({ seats, loadData, clickedSeat }) {
    function Seat({ name, r, c }) {
        let v = name === undefined ? 0 : name === null ? 1 : 2;

        return (
            <div title={name === null ? "공석" : name} key={r + " " + c} className={"seat " + (v === 0 ? "path" : v === 1 ? "empty" : "taken")} onClick={() => clickedSeat(v, r, c)}>{alph[r] + (c + 1)}</div>
        );
    }

    if (!seats) return <p>Loading</p>

    return (
        <ParallaxLayer className="view" offset={0} speed={2.5}>
            <div className="container">
                <h1>하나고 아트센터 좌석 예매</h1>
                <div className="grid">
                    {seats.map((ar, r) => ar.map((v, c) => <Seat name={v} r={r} c={c} />))}
                </div>
            </div>

            <div className="options">
                <div onClick={loadData} title="새로고침"><img src="/refresh.svg" /></div>
            </div>
        </ParallaxLayer>
    );
}

function SeatForm({ v, r, c, scroll, requestSeat }) {
    return (
        <ParallaxLayer className="form" offset={1} speed={0.5}>
            {!v ? <h1 onClick={() => scroll(0)}>좌석을 먼저 선택해주세요!</h1> :
                <form onSubmit={requestSeat}>
                    {
                        v === 1 ? (
                            <>
                                <h1>자리 받기</h1>

                                <input name="name" placeholder="이름" />
                                <input name="pin" placeholder="PIN" />
                                <input name="student_id" placeholder="고유 학번" />
                                <input name="neis_id" placeholder="나이스 학번" />
                                <input name="study_floor" placeholder="면학실 층" />
                                <input name="study_seat" placeholder="면학실 좌석" />

                                <button>{alph[r] + (c + 1)} 받기</button>
                            </>
                        ) : (
                            <>
                                <h1>자리 취소</h1>

                                <input name="pin" placeholder="PIN" />

                                <button>{alph[r] + (c + 1)} 취소</button>
                            </>
                        )
                    }
                </form>
            }

        </ParallaxLayer>
    );
}