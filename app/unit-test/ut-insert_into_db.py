import psycopg2
import uuid

database = psycopg2.connect(host='141.164.56.240',
                            dbname='postgres',
                            user='postgres',
                            password='QYFJAuaN>&6T',
                            port=5432)

cursor = database.cursor()

uuidF = uuid.uuid1()
name = '한덕웅'
pin = '1234'
student_id = '22200'
neis_id = '10223'
study_floor = 7
study_seat = 197
artcenter_seat = 5

try:
    cursor.execute(
        f"INSERT INTO reservation VALUES ('{uuidF}', '{name}', '{pin}', '{student_id}', '{neis_id}', {study_floor}, {study_seat}, {artcenter_seat});")
    database.commit()
except psycopg2.errors.UniqueViolation:
    print("ERR: UniqueViolation")
    try:
        database.commit()
    except:
        pass

cursor.execute(f"SELECT * FROM reservation;")

for var in cursor.fetchall():
    print(var)
