const username = "admin";

function renderPost(post, isNew = false) {
  const template = document
    .getElementById("post-template").content.cloneNode(true);
  template.querySelector(".username").innerText = post.username;
  template.querySelector(".message").innerText = post.message;
  document.getElementById("feed").appendChild(template);

  if (isNew){
    document.getElementById("feed").prepend(template);
  }else{
    document.getElementById("feed").appendChild(template);
  }

}


async function submitPost() {
  const message = document.getElementById("postInput").value;
  try{
const response = await fetch("/api/add_post",{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username, message
  })  
  });
  if (response.ok){
    renderPost({username,message},True);//Pass isNew as True'
    document.getElementById("postInput").value =""; //Clear the input box
  }
  } catch(error)
  {
    console.log("Post failed 🤣", error)
  } 


}

window.onload = async () => {
  try {
    const response = await fetch("/api/posts");
    const posts = await response.json();
    posts.forEach((post) => renderPost(post));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};