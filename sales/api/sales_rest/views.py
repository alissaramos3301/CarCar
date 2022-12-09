from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Sale, Customer, Employee


class SaleEncoder(ModelEncoder):
	model = Sale
	properties = [
		'id',
		'seller',
		'employee_number',
		'customer',
		'price',
		'automobile',
	]

class CustomerListEncoder(ModelEncoder):
	model = Customer
	properties = [
		'name',
		'address',
		'phone',
		'id',
	]

class EmployeeEncoder(ModelEncoder):
	model = Employee
	properties = [
		'name',
		'employee_number',
	]


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
	if request.method == "GET":
		sales = Sale.objects.all()
		return JsonResponse(
			{"sales": sales},
			encoder=SaleEncoder,
		)
	else:
		# try:
			content = json.loads(request.body)
			sale = Sale.objects.create(**content)
			return JsonResponse(
				sale,
				encoder=SaleEncoder,
				safe=False,
			)
		# except:
		# 	response = JsonResponse(
		# 		{"message": "Could not add sale"}
		# 	)
		# 	response.status_code = 400
		# 	return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sale(request, pk):
	if request.method == "GET":
		try:
			sale = Sale.objects.get(id=pk)
			return JsonResponse(
				sale,
				encoder=SaleEncoder,
				safe=False
			)
		except Sale.DoesNotExist:
			response = JsonResponse({"message": "Does not exist"})
			response.status_code = 404
			return response
	elif request.method == "DELETE":
		try:
			sale = Sale.objects.get(id=pk)
			sale.delete()
			return JsonResponse(
				sale,
				encoder=SaleEncoder,
				safe=False,
			)
		except Sale.DoesNotExist:
			return JsonResponse({"message": "Does not exist"})
	else:
		try:
			content = json.loads(request.body)
			sale = Sale.objects.get(id=pk)

			props =['id']
			for prop in props:
				if prop in content:
					setattr(sale, prop, content[prop])
			sale.save()
			return JsonResponse(
				sale,
				encoder=SaleEncoder,
				safe=False,
			)
		except Sale.DoesNotExist:
			response = JsonResponse({"message": "Does not exist"})
			response.status_code = 404
			return response


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
	if request.method == "GET":
		customers = Customer.objects.all()
		return JsonResponse(
			{"customers": customers},
			encoder=CustomerListEncoder,
		)
	else:
		# try:
		content = json.loads(request.body)
		# print("content: " + content)
		customer = Customer.objects.create(**content)
		# print("customer: " + customer)
		return JsonResponse(
			customer,
			encoder=CustomerListEncoder,
			safe=False,
		)
		# except:
		# 	response = JsonResponse(
		# 		{"message": "Could not add customer"}
		# 	)
		# 	response.status_code = 400
		# 	return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request,pk):
	if request.method == "GET":
		try:
			customer = Customer.objects.get(id=pk)
			return JsonResponse(
				customer,
				encoder=CustomerListEncoder,
				safe=False
			)
		except Customer.DoesNotExist:
			response = JsonResponse({"message": "The customer does not exist"})
			response.status_code = 404
			return response
	elif request.method == "DELETE":
		try:
			customer = Customer.objects.get(id=pk)
			customer.delete()
			return JsonResponse(
				customer,
				encoder=CustomerListEncoder,
				safe=False
			)
		except Customer.DoesNotExist:
			return JsonResponse({"message": "Customer not exist"})
	else:
		try:
			content = json.loads(request.body)
			customer = Customer.objects.get(id=pk)

			props = ["name"]
			for prop in props:
				if prop in content:
					setattr(customer, prop, content[prop])
			customer.save()
			return JsonResponse(
				customer,
				encoder=CustomerListEncoder,
				safe=False,
			)
		except Customer.DoesNotExist:
			response = JsonResponse({"message": "Does not exist"})
			response.status_code = 404
			return response

@require_http_methods(["GET", "POST"])
def api_list_sellers(request):
	if request.method == "GET":
		sellers = Employee.objects.all()
		return JsonResponse(
			{"sellers": sellers},
			encoder=EmployeeEncoder,
		)
	else:
		# try:
		content = json.loads(request.body)
		# print("content: " + content)
		seller = Employee.objects.create(**content)
		# print("seller: " + seller)
		return JsonResponse(
			seller,
			encoder=EmployeeEncoder,
			safe=False,
		)
		# except:
		# 	response = JsonResponse(
		# 		{"message": "Could not add seller"}
		# 	)
		# 	response.status_code = 400
		# 	return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_seller(request,pk):
	if request.method == "GET":
		try:
			seller = Employee.objects.get(id=pk)
			return JsonResponse(
				seller,
				encoder=EmployeeEncoder,
				safe=False
			)
		except Employee.DoesNotExist:
			response = JsonResponse({"message": "The seller does not exist"})
			response.status_code = 404
			return response
	elif request.method == "DELETE":
		try:
			seller = Employee.objects.get(id=pk)
			seller.delete()
			return JsonResponse(
				seller,
				encoder=EmployeeEncoder,
				safe=False
			)
		except Employee.DoesNotExist:
			return JsonResponse({"message": "Seller not exist"})
	else:
		try:
			content = json.loads(request.body)
			seller = Employee.objects.get(id=pk)

			props = ["name"]
			for prop in props:
				if prop in content:
					setattr(seller, prop, content[prop])
			seller.save()
			return JsonResponse(
				seller,
				encoder=EmployeeEncoder,
				safe=False,
			)
		except Employee.DoesNotExist:
			response = JsonResponse({"message": "Does not exist"})
			response.status_code = 404
			return response