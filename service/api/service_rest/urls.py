from django.urls import path

from .views import(
    api_list_appointments,
    api_detail_appointment,
    api_list_technician,
    api_detail_technician,
)

urlpatterns = [
    path(
        "technicians/",
        api_list_technician, 
        name="api_list_technician",
    ),
    path(
        "technicians/<int:pk>",
        api_detail_technician,
        name="api_detail_technician",
    ),
    path(
        "appointments/",
        api_list_appointments,
        name="api_list_appointments",
    ),
    path(
        "appointments/<int:pk>",
        api_detail_appointment,
        name="api_detail_appointment",
    ),
]

