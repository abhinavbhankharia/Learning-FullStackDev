function fetchPostData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Post Data fetched")
        }, 2000);
    })
    
}

function fetchCommentData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Comment Data fetched");
    }, 3000);
  });
}

async function getBlogData(){
    try {
        console.log("Fetching blog data");
       // const blogData = await fetchPostData()
       // const commentData = await fetchCommentData()
       
       const [postData, commentData] = await Promise.all([fetchPostData(), fetchCommentData()])
       console.log(blogData);
        console.log(commentData);
        
        
        console.log("fetch completed");
        
    } catch (error) {
        console.log("error fetching blog data", error);
        
    }
}
getBlogData()