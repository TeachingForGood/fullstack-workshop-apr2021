const { readFile } = require('fs').promises;

readLocalFile = async() => {
    let data;
    
    data = await readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/input.txt', { encoding: 'utf8' });    

    //console.log(data.toString());
    console.log((data !== undefined)? data.toString(): 'No Data');
    console.log("Program Ended 1");
    
    let promiseReturned = readFile('/Users/rajesh.pandian/Workspaces/teaching-for-good/fullstack-workshop-apr2021/microservices/movies/src/call-backs/output.txt', { encoding: 'utf8' });
    promiseReturned
       .then((data) => {
              console.log(data);
              console.log("Output 2 Ended");
       })
       .catch((error) => { 
              console.error('Got error reading file: ', error);
       });

    console.log("Return data");
};

(async () => {
    try {
        await readLocalFile();    
    } catch (error) {
        console.error('Caugt the error: Error Processing File: ', error);
    }
})();
