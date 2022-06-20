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
               "inlineValue": "5"
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
               "inlineValue": "cli"
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
               "inlineValue": "local"
            }
         }
      },
     {
         "id":"source",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": source
            }
         }
      },
     {
         "id":"target",
         "input":{
            "format":{
               "mimeType":"text/plain"
            },
            "value":{
               "inlineValue": target
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
               "inlineValue": "999"
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
               "inlineValue": "999"
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
