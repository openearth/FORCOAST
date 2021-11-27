export const template_r2 = (time) =>({
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