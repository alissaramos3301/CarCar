import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
# from sales_rest.models import VO

# def get_location():
#     url = "http://wardrobe-api:8000/api/locations/"
#     response = requests.get(url)
#     content = json.loads(response.content)
#     print(content)

#     for location in content["locations"]:
#         LocationVO.objects.update_or_create(
#             import_href=location["href"],
#             closet_name=location["closet_name"],
#             shelf_number=location["shelf_number"],
#             section_number=location["section_number"],
#         )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
