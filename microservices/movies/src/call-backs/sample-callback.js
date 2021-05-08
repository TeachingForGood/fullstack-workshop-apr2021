var fs = require("fs");

readLocalFile = () => {
   fs.readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/input.txt'
   , callbackFxn);
}

function callbackFxn (err, data) {
   if (err) {
      console.error('Error Reading file');
      return console.error(err);
   }
   console.log(data.toString());
   console.log("Input file read ");
   
   fs.readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/output.txt', 
   (err2, data2) => {
      if (err2) {
         return console.error(err2);
      }
      console.log(data2.toString());
      console.log("Output file read ");
   });
   
}

readLocalFile();