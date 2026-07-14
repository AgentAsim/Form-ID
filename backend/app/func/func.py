import datetime
from dateutil.relativedelta import relativedelta
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


    def finance_summery(self, summery_duration=""):
        finance_summery_block = {
            "Govt Fee": 0,
            "Service Charge": 0,
            "Total Amount": 0,
            "Due": 0
        }

        if summery_duration.lower() == "current":
            month_value = self.get_filtered_month()

        elif summery_duration.lower() == "previous":
            month_value = self.get_filtered_month(previous=True)

        else:
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
                finance_summery_block["Govt Fee"] += doc["Govt_Fee"]
                finance_summery_block["Service Charge"] += doc["Service_Charge"]
                finance_summery_block["Total Amount"] += doc["Total_Amount"]
                finance_summery_block["Due"] += doc["Due"]

            #return JSONResponse(status_code=200, content=finance_summery_block)
            return finance_summery_block

            
        else:
            HTTPException(detail="Finance Details not allowed for this user!!!", status_code=401)
