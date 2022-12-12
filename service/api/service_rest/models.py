from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    vip = models.BooleanField(default=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name


class Status(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "statuses"


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    owner = models.CharField(max_length=100)
    date = models.DateTimeField(null=True, blank=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE)
    reason = models.CharField(max_length=200)
    vip = models.BooleanField(default=False)
    # active = models.BooleanField(default=False)
    status = models.ForeignKey(Status, related_name="appointments", null=True, on_delete=models.CASCADE)
    
    def cancel(self):
        status = Status.objects.get(name="cancelled")
        self.status = status
        self.save()

    def finished(self):
        status = Status.objects.get(name="finished")
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.pk})

    def __str__(self):
        return self.owner

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="scheduled")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    
    # def __str__(self):
    #     return f'{self.owner}\'s appointment for {self.reason} on {self.date}'
    
    
    
