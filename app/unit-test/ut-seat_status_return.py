import psycopg2
import json

database = psycopg2.connect(host='141.164.56.240',
                            dbname='postgres',
                            user='postgres',
                            password='QYFJAuaN>&6T',
                            port=5432)

cursor = database.cursor()

json_object = {"reserved": []}
json_object = json.loads(json.dumps(json_object))

cursor.execute(f"SELECT student_name, artcenter_seat FROM reservation;")
for var in cursor.fetchall():
    (ret_name, ret_seat) = var
    json_object["reserved"].append({ret_seat: ret_name})

print(json_object)
