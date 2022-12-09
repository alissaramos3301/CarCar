from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
	import_href = models.CharField(max_length=200, unique=True)
	vin = models.CharField(max_length=17, unique=True)
	sold = models.BooleanField()
	# year = models.PositiveSmallIntegerField()
	# model = models.CharField(max_length=100, unique=True)
	# model = models.ForeignKey(
    #     VehicleModel,
    #     related_name="automobiles",
    #     on_delete=models.CASCADE,
    # )

# class CustomerVO(models.Model):
# 	import_href = models.CharField(max_length=200, unique=True)
# 	name =
# 	address =
# 	phone =
class SalesPerson(models.Model):
	name = models.CharField(max_length=100, unique=True)
	employee_number = models.PositiveSmallIntegerField()

	def __str__(self):
		return self.name

	def get_api_url(self):
		return reverse("api_show_automobile", kwargs={"pk": self.pk})


class Customer(models.Model):
	import_href = models.CharField(max_length=200, unique=True, null=True)
	name = models.CharField(max_length=100)
	address = models.CharField(max_length=100)
	phone = models.PositiveIntegerField()

	# def __str__(self):
	# 	return self.name

	# def get_api_url(self):
	# 	return reverse("api_list_customers", kwargs={"pk": self.id})

class Sale(models.Model):
	price = models.PositiveIntegerField()
	automobile = models.ForeignKey(
		AutomobileVO,
		related_name="sale",
		on_delete=models.PROTECT
	)
	sales_person = models.ForeignKey(
		SalesPerson,
		related_name="sale",
		on_delete=models.PROTECT
	)
	customer = models.ForeignKey(
		Customer,
		related_name="sale",
		on_delete=models.PROTECT
	)

	def get_api_url(self):
		return reverse("api_show_sale", kwargs={"pk": self.id})