export const template_a2 = (time, id, area, source, target) =>({
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
               "inlineValue": "3"
            }
         }
      },
     {
         "id":"mode",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": "github"
            }
         }
      },
     {
         "id":"config",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": "https://raw.githubusercontent.com/FORCOAST/ForCoast-A2-Settings/Eforie_case_1/config.yaml"
            }
         }
      },
     {
         "id":"sources",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": "https://raw.githubusercontent.com/FORCOAST/ForCoast-A2-Settings/Eforie_case_1/sources.txt"
            }
         }
      },
     {
         "id":"targets",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": "https://raw.githubusercontent.com/FORCOAST/ForCoast-A2-Settings/Eforie_case_1/targets.txt"
            }
         }
      },
     {
         "id":"datadir",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": "/usr/src/app/data/"
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
               "inlineValue": "-1001780197306"
            }
         }
      }
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
