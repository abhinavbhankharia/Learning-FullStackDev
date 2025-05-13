function fetchUserData(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve({name :'chaicode', url : "https://google.com"})
        },3000);
    })
}
async function getUsetData(){
    try {
        console.log("fetching user data....");
        const userData = await fetchUserData()       //can only use await if you have async over a function
        console.log("User data fetched successfully");
        console.log("user data:", userData);        //await used over the process that might take some time to execute
                                  
    } catch (error) {
        console.log("error fetching data: ", error);
    }
}

getUsetData();