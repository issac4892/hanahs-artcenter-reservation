import psycopg2

database = psycopg2.connect(host='141.164.56.240',
                            dbname='postgres',
                            user='postgres',
                            password='QYFJAuaN>&6T',
                            port=5432)

cursor = database.cursor()

artcenter_seat = 5

cursor.execute(f"SELECT student_name, pin FROM reservation WHERE artcenter_seat = '{artcenter_seat}';")
cur_resp = cursor.fetchone()

if cur_resp == None:
    print("There is no reservation at that seat")
else:
    print(cur_resp)