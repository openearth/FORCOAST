export const template_a4 = (ndays, ptm, tt, gdt, ttcs, pldmin, pldmax, sd) =>({
    "inputs":[
      {
          "id":"ndays",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": ndays.toString()
             }
          }
       },
      {
          "id":"ptm",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": ptm.toString()
             }
          }
       },
      {
          "id":"tt",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": tt.toString()
             }
          }
       },
      {
          "id":"gdt",
          "input":{
             "format":{
                "mimeType":"text/plain"
             },
             "value":{
                "inlineValue": gdt.toString()
             }
          }
       },
       {
        "id":"ttcs",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": ttcs.toString()
           }
        }
     },
     {
        "id":"pldmin",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": pldmin.toString()
           }
        }
     },
     {
        "id":"pldmax",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": pldmax.toString()
           }
        }
     },
     {
        "id":"sd",
        "input":{
           "format":{
              "mimeType":"text/plain"
           },
           "value":{
              "inlineValue": sd.toString()
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
              "inlineValue": "-1001773490347"
           }
        }
     },
     {
        "id":"bulletin",
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