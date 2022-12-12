from django.contrib import admin

from django.contrib import admin
from .models import (
    AutomobileVO,
    Technician,
    Appointment,
)


@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass