# MYSQL 연결
import pymysql

# MYSQL Connection 연결
con = pymysql.connect(host='localhost', user='judiai', password='mococo00.',
                      db='mococodb', charset='utf8')

# Connection으로부터 Cursor 생성
cur = con.cursor()

# SQL문 실행 및 Fetch
sql = "INSERT INTO qna(question) VALUES ('파이썬 시범문장이에요')"
cur.execute(sql)

# 데이터 Fetch
rows = cur.fetchall()
print(rows)  # 전체 rows

# DB 연결 종료
con.close()