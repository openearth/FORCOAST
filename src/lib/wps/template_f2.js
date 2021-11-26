export const template_f2 = (time, id) =>({
   "inputs":[
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
               "inlineValue": "0"
            }
         }
      }
   ],
   "outputs":[
      {
         "id":"result1",
         "format":{
            "mimeType":"application/x-ewps-stac"
         },
         "transmissionMode":"reference"
      }
   ],
   "response":"document",
   "mode":"async"
})