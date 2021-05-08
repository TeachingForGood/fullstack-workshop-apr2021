const { readFile } = require('fs').promises;

readLocalFile = () => {
       let promiseReturnedInput = readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/input.txt', { encoding: 'utf8' });
       let promiseReturnedOutput = readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/output.txt', { encoding: 'utf8' });
       let promiseReturnedInput3 = readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/input2.txt', { encoding: 'utf8' });
       
       Promise.all([promiseReturnedInput, promiseReturnedOutput, promiseReturnedInput3])
       .then(processPromises)
       .catch((error) => { 
              console.error('Got error reading file: ', error);
       });


       // promiseReturned
       // .then((data) => {
       //        console.log(data);
       //        console.log("Program Ended");
       // })
       // .catch((error) => { 
       //        console.error('Got error reading file: ', error);
       // });
       
}

function processPromises(promiseData) {
       console.log('Length of Array: ', promiseData.length);
       for (let value of promiseData) {
              console.log(value);
       }  
}
readLocalFile();