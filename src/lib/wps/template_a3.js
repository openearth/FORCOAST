export const template_a3 = (years, mb, me, sl, su, tl) =>({
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
              "inlineValue": "26"
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
              "inlineValue": "0.75"
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
              "inlineValue": "4.5"
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
              "inlineValue": "0.5"
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
              "inlineValue": "-4"
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
              "inlineValue": "8.84"
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
              "inlineValue": "56.75"
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
              "inlineValue": "0.66"
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