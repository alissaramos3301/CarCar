from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
	vin = models.CharField(max_length=17, unique=True)
	sold = models.BooleanField(default=False)

class Employee(models.Model):
	name = models.CharField(max_length=100, unique=True)
	employee_number = models.CharField(max_length=100, null=True, unique=True)


class Customer(models.Model):
	import_href = models.CharField(max_length=200, unique=True, null=True)
	name = models.CharField(max_length=100)
	address = models.CharField(max_length=100)
	phone = models.PositiveIntegerField()

class Sale(models.Model):
	price = models.PositiveIntegerField()
	automobile = models.ForeignKey(
		AutomobileVO,
		related_name="sale",
		on_delete=models.PROTECT
	)
	employee = models.ForeignKey(
		Employee,
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