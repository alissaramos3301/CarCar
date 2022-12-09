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
# from sales_rest.models import AutoVO

# def get_automobile():
#     url = "http://inventory-api:8000/api/automobile/"
#     response = requests.get(url)
#     content = json.loads(response.content)
#     print(content)

#     for automobile in content["autos"]:
#         AutoVO.objects.update_or_create(
#             import_href=automobile["href"],
#             closet_name=automobile["closet_name"],
#             shelf_number=automobile["shelf_number"],
#             section_number=automobile["section_number"],
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
