export const template_a1 = (area, time, lat, lon, lim) =>({
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
         "id":"lim",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": lim.toString()
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