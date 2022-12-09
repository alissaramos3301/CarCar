# CarCar

Team:

* Alissa Ramos - Service
* Mack Hill - Sales

## Design

We first started working on inventory.
Mack worked on making ManufacturersList.js, VehicleModelsList.js, and AutomobilesList.js. Then made sure they were rendering on the React page by including Nav links in Nav.js, and route paths in App.js

Alissa worked on making ManufacturerForm.js, VehicleModelForm.js, and AutomobileForm.js.
## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Created AutomobileVO, Employee, Customer, and Sale models.
Sales has foreign keys:
    -automobile pointing to AutomobileVO,
    -employee pointing to Employee
    -customer pointing to Customer

Automobile data is gathered through polling the api database in inventory