from fastapi import FastAPI
from app.databases.db import cursor

app = FastAPI()

@app.get("/home")
async def home():
    select_query = "SELECT * FROM a"
    # data_to_find = ("1",)

    # Execute the query
    print(cursor.execute(select_query))
    result = cursor.fetchall()
    return result

# @app.get("/home/{id}")
# async def data(id: int):
#     return db.cursor.get(id)