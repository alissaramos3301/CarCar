from django.urls import path, include
from .views import api_list_customers, api_list_sales, api_show_customer, api_show_sale, api_list_sellers, api_show_seller

urlpatterns = [
    path('sales/', api_list_sales, name="api_list_sales"),
    path('sales/<int:pk>', api_show_sale, name="api_show_sale"),
    path('customers/', api_list_customers, name="api_list_customers"),
    path('customers/<int:pk>', api_show_customer, name="api_show_customer"),
    path('sellers/', api_list_sellers, name="api_list_sellers"),
    path('sellers/<int:pk>', api_show_seller, name="api_show_seller"),
]