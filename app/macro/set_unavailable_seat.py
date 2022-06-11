import requests
import shortuuid

for i in [177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187]:
    req = requests.post(f"http://141.164.56.240:8000/v1/reservation/?name=통로&pin={shortuuid.uuid()[0:8]}&student_id={shortuuid.uuid()[0:8]}&neis_id={shortuuid.uuid()[0:8]}&study_floor=1&study_seat=0&artcenter_seat={i}")
    print(req.text)

