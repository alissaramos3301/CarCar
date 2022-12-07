from django.urls import path, include
from .views import api_list_customers, api_list_sales

urlpatterns = [
    path('sales/', api_list_sales, name="api_list_sales"),
    path('customers/', api_list_customers, name="api_list_customers"),
]