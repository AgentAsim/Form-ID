import datetime
from dateutil.relativedelta import relativedelta
import uuid
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from app.model.model import finance_filter_entitys


class Func():
    def __init__(self, current_user: bool, collection_name):
        self.current_user = current_user
        self.collection_name = collection_name


    def get_filtered_month(self, previous=False):
        current_date = datetime.date.today()
        filter_month = current_date.strftime("%b%y")        
        if previous:
            first_day_of_current_month = current_date.replace(day=1)
            previous_month = first_day_of_current_month - relativedelta(months=1)
            filter_month = previous_month.strftime("%b%y")
        return filter_month


    def finance_summary(self, summary_duration=""):
        finance_summary_block = {
            "id": "",
            "Month": "",
            "Govt_Fee": 0,
            "Service_Charge": 0,
            "Total_Amount": 0,
            "Due": 0
        }

        if summary_duration.lower() == "current":
            finance_summary_block["id"] = str(uuid.uuid4())
            finance_summary_block["Month"] = "Current Month"
            month_value = self.get_filtered_month()

        elif summary_duration.lower() == "previous":
            finance_summary_block["id"] = str(uuid.uuid4())
            finance_summary_block["Month"] = "Previous Month"
            month_value = self.get_filtered_month(previous=True)

        else:
            finance_summary_block["id"] = str(uuid.uuid4())
            finance_summary_block["Month"] = "All Months"
            month_value = ""

        # fetch all rows
        if month_value:
            rows = self.collection_name.find({
                "Month": month_value
            })
        else:
            rows = self.collection_name.find()


        if rows:
            docs = finance_filter_entitys(rows)

            # if data not found
            if not docs:
                raise HTTPException(status_code=404, detail="Data Not Found!")

            for doc in docs:
                finance_summary_block["Govt_Fee"] += doc["Govt_Fee"]
                finance_summary_block["Service_Charge"] += doc["Service_Charge"]
                finance_summary_block["Total_Amount"] += doc["Total_Amount"]
                finance_summary_block["Due"] += doc["Due"]

            #return JSONResponse(status_code=200, content=finance_summery_block)
            return finance_summary_block

            
        else:
            HTTPException(detail="Finance Details not allowed for this user!!!", status_code=401)
