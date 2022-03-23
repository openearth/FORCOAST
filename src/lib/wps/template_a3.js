export const template_a3 = (years, mb, me, sl, su, tl, tu, kf, o, kr, d, c_lon, c_lat, r_lon) =>({
    "inputs":[
       {
          "id":"pilot",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": "Limfjord"
             }
          }
       },
      {
          "id":"Year",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": years
             }
          }
       },
      {
          "id":"Month begin",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": mb
             }
          }
       },
      {
          "id":"Month end",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": me
             }
          }
       },
      {
          "id":"Salinity lower treshold",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": sl
             }
          }
       },
       {
        "id":"Salinity upper treshold",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": su
           }
        }
     },
     {
        "id":"Temperature lower treshold",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": tl
           }
        }
     },
     {
        "id":"Temperature upper treshold",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": tu
           }
        }
     },
     {
        "id":"Half saturation constant for food",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": kf
           }
        }
     },
     {
        "id":"Oxygen lower treshold",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": o
           }
        }
     },
     {
        "id":"Treshold resuspension",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": kr
           }
        }
     },
     {
        "id":"Expected decay",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": d
           }
        }
     },
     {
        "id":"Telegram bot token",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": "5267228188:AAGx60FtWgHkScBb3ISFL1dp6Oq_9z9z0rw"
           }
        }
     },
     {
        "id":"Telegram chat_id",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": "-1001773490347"
           }
        }
     },
     {
        "id":"Bulletin",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": "./output/bulletin.png "
           }
        }
     },
     {
        "id":"method",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": "file"
           }
        }
     },  
     {
        "id":"Center point longitude",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": c_lon
           }
        }
     },
     {
        "id":"Center point latitude",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": c_lat
           }
        }
     },
     {
        "id":"Longitudinal range of map",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": r_lon
           }
        }
     },
    ],
    "outputs":[
       {
          "id":"result",
          "format":{
             "mimeType":"application/x-ewps-stac"
          },
          "transmissionMode":"reference"
       }
    ],
    "response":"document",
    "mode":"async"
 })