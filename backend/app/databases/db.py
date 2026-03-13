import mariadb
import sys


config = {
    "host": "localhost",
    "port": 3306,
    "user": "USER",
    "password": "PASSWORD",
    "database": "Shop"
}


try:
    conn = mariadb.connect(**config)
    print("Connection Successful")

    cursor = conn.cursor()
    print("Cursor created")

except mariadb.Error as e:
    print(f"Error occur in connecting to Mariadb Server with error code {e}")
    sys.exit(1)



select_query = "SELECT * FROM a;"

# Execute the query
print(cursor.execute(select_query))