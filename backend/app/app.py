import os
from typing import Annotated
from datetime import date
import mariadb
from dns import exception
from fastapi import FastAPI, HTTPException, Depends
from  fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bson import ObjectId
from dotenv import load_dotenv
from app.databases.mongo import conn
from app.model.model import home_entitys, search_entitys
from app.Search.search import SimpleSearchIndex
from app.schema.schema import CreateLog, UpdateLog, UpdateDue
from app.auth import auth_router, get_current_active_user, User

load_dotenv()

# fetch know urls
self_connect = os.getenv("self_connect")
local_connect = os.getenv("local_connect")
global_connect = os.getenv("global_connect")

app = FastAPI()
app.include_router(auth_router)

# Current Active User Dependency for methods
current_active_user = Annotated[User, Depends(get_current_active_user)]

# origins
origins = [
    self_connect,
    local_connect,
    global_connect
]

# make a bridge connection between frontend and admin <---> backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DataBase Table Selection
table_name = 'logs' # if int(os.getenv("SERVER_PORT")) == 8181 else 'test_table'


# User Session
@app.get("/user/session")
def user_session(current_user: current_active_user):
    if current_user:
        return True
    return False


@app.get("/home")
async def get_logs(current_user: current_active_user):
    # fetch all rows
    docs = conn.Shop.logs.find()
    result = home_entitys(docs)

    if not result:
        raise HTTPException(status_code=404, detail="Data Not Found!")

    return JSONResponse(content=result[::-1], status_code=200)


@app.post("/post", response_model=CreateLog)
async def post_log(row: CreateLog, current_user: current_active_user):
    # Make dict of row data
    new_doc_dict = row.model_dump()
    # Get date
    doc_date = str(date.today()) if row.Created_At.title() == 'Default' else row.Created_At

    # update date value
    new_doc_dict["Created_At"] = doc_date

    try:
        # Count total no of documents
        doc_count = conn.Shop.logs.count_documents({})
        # make index for new document
        new_doc_dict["id_no"] = doc_count + 1

        # Insert New Doc
        conn.Shop.logs.insert_one(new_doc_dict)

        return JSONResponse(content=f"Insertion Done Successfully!", status_code=201)
    except mariadb.Error as e:
        return HTTPException(detail=f"Insertion Failed! With Status Code {e}", status_code=500)



@app.put("/post/update")
async def update_log(row: UpdateLog, current_user: current_active_user):
    # Make dict of row data
    updated_doc_dict = row.model_dump()
    # Get date
    doc_date = str(date.today()) if row.Created_At.title() == 'Default' else row.Created_At
    # update date value
    updated_doc_dict["Created_At"] = doc_date

    # convert string to ObjectID for mongodb compatibility
    document_id = ObjectId(updated_doc_dict["id"])

    try:
        # Get Document from Database
        get_targeted_doc = conn.Shop.logs.find_one({"_id": document_id})

        # Update if Document is present in Database
        if get_targeted_doc:
            doc_update = conn.Shop.logs.update_one({"_id": document_id}, {"$set": updated_doc_dict})
            if doc_update.acknowledged:
                return JSONResponse(content="Document Update Successfully", status_code=200)

        else:
            raise HTTPException(status_code=404, detail="Document not found!")

    except Exception as e:
        raise HTTPException(detail=f"Couldn't able to update document due to: {e}", status_code=400)



@app.put("/post/UpdateDue")
async def update_due(due_row: UpdateDue, current_user: current_active_user):
    # Convert String to ObjectID for MongoDB compatibility
    document_id = ObjectId(due_row.id)
    try:
        # Find targeted document
        get_targeted_doc = conn.Shop.logs.find_one({"_id": document_id})

        # If document present make update
        if get_targeted_doc:
            doc_due_update = conn.Shop.logs.update_one({"_id": document_id}, {"$set": {"Due": due_row.Due}})
            if doc_due_update.acknowledged:
                return JSONResponse(content="Document Due Field Updated Successfully!", status_code=200)
        else:
            raise HTTPException(status_code=404, detail="Document not found!")

    except Exception as e:
        raise HTTPException(detail=f"Couldn't able to update document due to: {e}", status_code=400)


@app.get("/search/post/{query}")
async def search_row(query, current_user: current_active_user):
    try:
        search_engine = SimpleSearchIndex()
        # fetch all documents
        data = conn.Shop.logs.find()
        rows = home_entitys(data)

        searchTitles = ["Name", "Contact", "Application_ID", "Service", "Service_Type"]

        for row in rows:
            search_engine.add_to_index(searchTitles, row)

        filter_data = search_engine.search(query)

        return JSONResponse(content=filter_data[::-1], status_code=200)
    except:
        raise HTTPException(detail="Not Found", status_code=404)
