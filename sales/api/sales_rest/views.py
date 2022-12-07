from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Sale, Customer


class SaleEncoder(ModelEncoder):
	model = Sale
	properties = [
		'seller',
		'employee_number',
		'customer',
		'price',
		'automobile',
	]

class CustomerEncoder(ModelEncoder):
	model = Customer
	properties = [
		'name',
		'address',
		'phone_number',
	]

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
	if request.method == "GET":
		sales = Sale.objects.all()
		return JsonResponse(
			{"sales": sales},
			encoder=SaleEncoder,
		)

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
	if request.method == "GET":
		customers = Customer.objects.all()
		return JsonResponse(
			{"customers": customers},
			encoder=CustomerEncoder
		)