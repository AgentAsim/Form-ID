import datetime


class Func():
    def __init__(self):
        pass


    def get_filtered_month(self):
        current_date = datetime.date.today()
        filter_month = current_date.strftime("%b%y")        
        return filter_month
