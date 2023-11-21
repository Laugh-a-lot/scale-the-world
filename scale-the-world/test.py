import pymongo
import os
from pprint import pprint
from pymongo import MongoClient
import certifi
import requests
client = MongoClient("mongodb+srv://kumarsatyam2023:MKV62xlyb5iJ29DW@cluster0.8xnsltp.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
# Send a ping to confirm a successful connection

db = client.country
collection = db.topojson
air_quality_coll = db.airquality.find({})
topojson = list(collection.find({}))[0]["data"]
latlong = db['coordinates'].find({})[0]["data"]["ref_country_codes"]
countries = topojson["objects"]["countries"]["geometries"]
print(len(countries))

data = []

def fetchAirQuality(latitude, longitude):
    city = 'london'
    api_url = f'https://api.api-ninjas.com/v1/airquality?lat={latitude}&lon={longitude}'
    print(api_url)
    response = requests.get(api_url, headers={'X-Api-Key': 'IgdxjLLo5kPFjkbFbplC4aKszDqwp14ex3cjCEyj'})
    if response.status_code == requests.codes.ok:
        return response.json()
    

# for country in countries:
#     found = False
#     if 'id' in country.keys():
#         for coords in latlong:
#             if (int(country["id"]) == coords["numeric"]):
#                 air_quality_data = {}
#                 air_quality = fetchAirQuality(coords["latitude"], coords["longitude"])
#                 print(air_quality, coords)
#                 air_quality_data.update(coords)
#                 if air_quality:
#                     air_quality_data.update(air_quality)

#                 data.append(air_quality_data)
                
#                 break

        

print(len(list(air_quality_coll)))
# air_quality_coll.insert_many(data)

#   url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=${}`


