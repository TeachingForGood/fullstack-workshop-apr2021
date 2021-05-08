var fs = require("fs");

readLocalFile = () => {
   fs.readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/input.txt', callbackFxn);
   console.log("Program Ended");
}

function callbackFxn (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log(data.toString());
}

readLocalFile();