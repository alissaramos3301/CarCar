from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
	# import_href = models.CharField(max_length=200, unique=True)
	vin = models.CharField(max_length=17, unique=True)
	sold = models.BooleanField(null=True)

class Employee(models.Model):
	name = models.CharField(max_length=100, unique=True)
	employee_number = models.CharField(max_length=100, null=True, unique=True)

	# class Meta:
		# ordering=['employee_number']

class Customer(models.Model):
	import_href = models.CharField(max_length=200, unique=True, null=True)
	name = models.CharField(max_length=100)
	address = models.CharField(max_length=100)
	phone = models.PositiveIntegerField()

	class Meta:
		ordering = ['name']
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