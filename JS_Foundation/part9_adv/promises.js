function fetchData() {
  return new Promise((resolve, reject) => {
    //creating a promise
    setTimeout(() => {
      let success = true;
      if (success) {
        resolve("Data Fetched SUCCESSFULLY");
      } else {
        reject("error fetching data");
      }
    }, 3000);
  });
}

//consuming the promise

fetchData()
  .then((data) => {                                   //data returned by response
    console.log(data)
    return data.toLowerCase()                                 //then() chaining
  })                        
  .then((value) => console.log(value))
  .catch((error) => console.error(error));           //data returned by reject    
