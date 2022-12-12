# CarCar

Team:

* Alissa Ramos - Service
* Mack Hill - Sales


## How to Run this Application:
You can see the Manufactures, Vehicle Models, and Automobiles in the first few tabs.
In order to add one of them, click the add button on one of these pages which will redirect you to the add pages.
To add a manufacturer, simply type the manufacturer name and hit create. This should redirect you to the manufacturer list page upon creation.
For the vehicle model  type the name of the vehicle model, enter a picture URL, and choose a manufacturer from the dropdown. You must add a manufacturer before you can add a vehicle. This should redirect you to the vehicle model list page upon creation.
To add an automobile,  type the color, the year and the vin number of the automobile. Then choose the model of the automobile from the dropdown. You must add a vehicle model (and also a manufacturer)before you can add an automobile. This should redirect you to the automobile list page upon creation.

You can also see the employees(sales people), technicians, and customers.


Lastly, you are able to add a sale, see all sales, a list of sales per employee, and add a service appointment.


## Application Diagram

Put image or link to application diagram here. Identify your VOs here in the diagram.



## API Documentation

Document the endpoints of your API for each of the methods you implement (GET, POST, etc..)
Provide sample success responses and sample request body data for the post requests.

You could theoretically screenshot insomnia.


## Value Objects

If you didn't identify the VOs in your diagram, then identify them here.
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