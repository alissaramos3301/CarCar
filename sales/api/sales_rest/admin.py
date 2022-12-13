from django.contrib import admin
from .models import (
    Sale,
    Employee,
    AutomobileVO,
    Customer
)
@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass
