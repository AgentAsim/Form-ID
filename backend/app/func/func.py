import datetime
from dateutil.relativedelta import relativedelta
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from app.model.model import finance_filter_entitys


class Func():
    def __init__(self, current_user, collection_name):
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


    def current_month_summery(self):
        summery_result_current_month = {
            "Govt Fee": 0,
            "Service Charge": 0,
            "Total Amount": 0,
            "Due": 0
        }

        summery_result_privous_month = {
            "Govt Fee": 0,
            "Service Charge": 0,
            "Total Current": 0,
            "Total Due": 0
        }

        summery_result_total = {
            "Govt Fee": 0,
            "Service Charge": 0,
            "Total Current": 0,
            "Total Due": 0
        }

        current_month_value = self.get_filtered_month()

        # fetch all rows
        rows = self.collection_name.find({
            "Month": current_month_value
        })

        if self.current_user.super:
            docs = finance_filter_entitys(rows)

            # if data not found
            if not docs:
                raise HTTPException(status_code=404, detail="Data Not Found!")

            for doc in docs:
                print(doc)
                summery_result_current_month["Govt Fee"] += doc["Govt_Fee"]
                summery_result_current_month["Service Charge"] += doc["Service_Charge"]
                summery_result_current_month["Total Amount"] += doc["Total_Amount"]
                summery_result_current_month["Due"] += doc["Due"]
                
            return JSONResponse(status_code=200, content=summery_result_current_month)

            
        else:
            HTTPException(detail="Finance Details not allowed for this user!!!", status_code=401)
