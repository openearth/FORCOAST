export const template_r1 = (area, dateTime, period, lon, lat) =>({
   "inputs":[
     {
         "id":"pilot",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": area
            }
         }
      },
     {
         "id":"time",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": dateTime
            }
         }
      },
      // {
      //    "id":"hours",
      //    "input":{
      //       "format":{
      //          "mimeType":"text/plain"
      //       },
      //       "value":{
      //          "inlineValue": hours
      //       }
      //    }
      // },
     {
         "id":"period",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": period.toString()
            }
         }
      },
     {
         "id":"lon",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": lon.toString()
            }
         }
      },
     {
         "id":"lat",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": lat.toString()
            }
         }
      },
     {
         "id":"token",
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
         "id":"chat_id",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": "-1001558581397"
            }
         }
      }
   ],
   "outputs":[
      {
         "id":"result",
         "format":{
            "mimeType":"application/binary"
         },
         "transmissionMode":"reference"
      }
   ],
   "response":"document",
   "mode":"async"
})