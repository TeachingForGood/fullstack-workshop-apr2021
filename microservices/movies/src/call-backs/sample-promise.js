const { readFile } = require('fs').promises;

readLocalFile = () => {
       let promiseReturned = readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/input.txt', { encoding: 'utf8' });
       
       promiseReturned
       .then((data) => {
              console.log(data);
       })
       .catch((error) => { 
              console.error('Got error reading file: ', error);
       });

       console.log("Program Ended");
}

readLocalFile();