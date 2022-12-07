from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Sale


class SaleEncoder(ModelEncoder):
	model = Sale
	properties = [
		'seller',
		'employee_number',
		'customer',
		'price',
		'automobile',

	]

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
	if request.method == "GET":
		sales = Sale.objects.all()
		return JsonResponse(
			{"sales": sales},
			encoder=SaleEncoder,
		)