var fs = require("fs");

readLocalFile = () => {
   fs.readFile('microservices/products/src/call-backs/input.txt', callbackFxn);
   console.log("Program Ended");
}

function callbackFxn (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log(data.toString());
}

readLocalFile();