from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
from .models import Technician, AutomobileVO, Appointment
from django.shortcuts import render
import json


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        'id',
        'name',
        'employee_number'
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "color",
        "year",
        "vip"
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'id',
        'vin',
        'owner',
        'date',
        'technician',
        'reason',
        'vip',
        # 'active'
    ]
    encoders = {"technician": TechnicianEncoder()}
    
    # def get_extra_data(self, o):
    #     return {"status": o.status.name}

#create the http methods. Front end needs something to refer back too
@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder = AppointmentEncoder,
            safe = False
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            # content = json.loads(request.body)
            employee_number = content['technician']
            technician = Technician.objects.get(employee_number=employee_number)
            content["technician"] = technician
        except:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=400,
            )
        try:
            automobiles = AutomobileVO.objects.all()
            for automobile in automobiles:
                if content['vin'] == automobile.vin:
                    content['is_vip'] = True
        except:
            return JsonResponse(
                {"message": ""}
            )
            
        appointments = Appointment.objects.create(**content)
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe = False
        )

# @require_http_methods(["GET"])
# def api_vin_list(request, vin):
#     vin = AutomobileVO.objects.get(vin=vin)
#     api_vin_list = Appointment.objects.filter(vin=vin)
#     return JsonResponse(
#         {'api_vin_list': api_vin_list},
#         encoder=AppointmentEncoder,
#     )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_detail_appointment(request, pk):
    if request.method == 'GET':
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                {"appointment": appointment},
                encoder = AppointmentEncoder,
                safe = False
            )
        except:
            return JsonResponse(
                {"message": "Appointment does exist"},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        try:
            if AutomobileVO.objects.filter(vin = content["vin"]).exists():
                content["vip"] = True
            Appointment.objects.filter(id = pk).update(**content)
            appointment = Appointment.objects.get(id = pk)
            return JsonResponse(
                appointment,
                encoder = AppointmentEncoder,
                safe = False                
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status = 400
            )
            
@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder,
            safe = False
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder = TechnicianEncoder,
                safe = False
            )
        except:
            return JsonResponse(
                {"message": "Could not create Technician"},
                status=400,
        )


@require_http_methods(["PUT", "DELETE", "GET"])
def api_detail_technician(request, pk):
    if request.method == "GET":
        try:
            technicician = Technician.objects.get(id=pk)
            return JsonResponse(
                {"technician": technicician},
                encoder = TechnicianEncoder,
                safe = False
            )
        except:
                return JsonResponse(
                    {"message": "Technician Employee ID does exist"},
                    status=400,                    
            )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(employee_number = pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        try:
            Technician.objects.filter(id = pk).update(**content)
            technician = Technician.objects.get(employee_number = pk)
            return JsonResponse(
                technician,
                encoder = TechnicianEncoder,
                safe = False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status = 400
            )