import datetime
from dateutil.relativedelta import relativedelta


class Func():
    def __init__(self):
        pass


    def get_filtered_month(self, previous=False):
        current_date = datetime.date.today()
        filter_month = current_date.strftime("%b%y")        
        if previous:
            first_day_of_current_month = current_date.replace(day=1)
            previous_month = first_day_of_current_month - relativedelta(months=1)
            filter_month = previous_month.strftime("%b%y")
        return filter_month
