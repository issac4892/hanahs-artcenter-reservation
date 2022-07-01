from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import uuid
import json

origins = ["*"]

# origins = [
#     "http://localhost",
#     "http://localhost:8080",
# ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def transaction(sql: str):
    database = psycopg2.connect(host='localhost',
                                dbname='postgres',
                                user='postgres',
                                password='QYFJAuaN>&6T',
                                port=5432,
                                keepalive=1)
    cursor = database.cursor()

    cursor.execute(sql)
    ret = cursor.fetchall()


database = psycopg2.connect(host='localhost',
                            dbname='postgres',
                            user='postgres',
                            password='QYFJAuaN>&6T',
                            port=5432)

cursor = database.cursor()


@app.get("/")
def root():
    return {"message": "ㅎㅇ, 나도 보안 안걸고 대충 만든거 아니까 뚫을 생각은 말아주길 부탁함. 찾아오면 매점 사드릴테니까 건들지만 말아줘요... -권동한-"}


@app.get("/v1/reservation/")
def seat_status():
    json_object = {"reserved": []}
    json_object = json.loads(json.dumps(json_object))

    cursor.execute(f"SELECT student_name, artcenter_seat FROM reservation;")
    for var in cursor.fetchall():
        (ret_name, ret_seat) = var
        json_object["reserved"].append({ret_seat: ret_name})

    return json_object


@app.post("/v1/reservation/")
def create_reservation(name: str,  # 학생 이름
                       pin: str,  # 예약 Pin
                       student_id: str,  # 학생 고유학번
                       neis_id: str,  # 학생 나이스학번
                       study_floor: int,  # 면학실 층
                       study_seat: int,  # 면학실 좌석번호
                       artcenter_seat: int,  # 예약 좌석 번호
                       response: Response):
    try:
        cursor.execute(
            f"INSERT INTO reservation VALUES ('{uuid.uuid1()}', '{name}', '{pin}', '{student_id}', '{neis_id}', {study_floor}, {study_seat}, {artcenter_seat});"
        )

    except:
        response.status_code = 400
        return {"message": "요청이 중복되거나 처리할 수 없습니다. 신청자의 기존 예약과 중복되거나 해당 좌석이 이미 예매되었습니다."}

    finally:
        database.commit()

    response.status_code = 201
    return {"message": "신청이 완료되었습니다."}


@app.delete("/v1/reservation/")
def delete_reservation(artcenter_seat: int,
                       pin: str,
                       response: Response):
    cursor.execute(f"SELECT student_name, pin FROM reservation WHERE artcenter_seat = '{artcenter_seat}';")
    cur_resp = cursor.fetchone()

    if cur_resp == None:
        response.status_code = 404
        return {"message": "취소하고자 하는 예약이 존재하지 않습니다."}

    # 취소하고자 하는 예약이 존재한다면
    (ret_name, ret_pin) = cur_resp

    if ret_pin == pin:
        cursor.execute(f"DELETE FROM reservation WHERE artcenter_seat = '{artcenter_seat}';")
        database.commit()
        response.status_code = 200
        return {"message": f"{ret_name}님의 예약이 성공적으로 취소되었습니다."}

    else:  # ret_pin != pin
        response.status_code = 401
        return {"message": f"PIN이 일치하지 않습니다. 운영팀에 연락바랍니다."}
