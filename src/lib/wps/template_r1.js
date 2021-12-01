export const template_r1 = (area, time, period, lon, lat) =>({
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
               "inlineValue": time
            }
         }
      },
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