from fastapi import FastAPI
import uvicorn
from config.db import cur

app = FastAPI()

@app.get("/")
async def home():
	return cur.execute("SELECT * FROM SHOP",(some_name,))
	