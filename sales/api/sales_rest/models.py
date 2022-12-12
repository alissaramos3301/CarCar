from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
	# import_href = models.CharField(max_length=200, unique=True)
	vin = models.CharField(max_length=17, unique=True)
	sold = models.BooleanField()
	# year = models.PositiveSmallIntegerField()
	# model = models.CharField(max_length=100, unique=True)
	# model = models.ForeignKey(
    #     VehicleModel,
    #     related_name="automobiles",
    #     on_delete=models.CASCADE,
    # )
	def __str__(self):
		return self.name

	def get_api_url(self):
		return reverse("api_show_automobile", kwargs={"pk": self.pk})

# class CustomerVO(models.Model):
# 	import_href = models.CharField(max_length=200, unique=True)
# 	name =
# 	address =
# 	phone =
class Employee(models.Model):
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
	# import_href = models.CharField(max_length=200, unique=True)
	price = models.PositiveIntegerField()
	automobile = models.ForeignKey(
		AutomobileVO,
		related_name="auto",
		on_delete=models.PROTECT
	)
	employee = models.ForeignKey(
		Employee,
		related_name="employee",
		on_delete=models.PROTECT
	)
	customer = models.ForeignKey(
		Customer,
		related_name="customer",
		on_delete=models.PROTECT
	)

	def get_api_url(self):
		return reverse("api_show_sale", kwargs={"pk": self.id})