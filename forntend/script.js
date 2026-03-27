document.getElementById("contactForm").addEventListener("submit", async function(e){

e.preventDefault();

const data={
name:document.getElementById("name").value,
email:document.getElementById("email").value,
message:document.getElementById("message").value
};

try{

const res=await fetch("https://mini-project-e3sr.onrender.com/contact",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

if(res.ok){

alert("Message Sent Successfully 🚀");

document.getElementById("contactForm").reset();

}else{

alert("Error sending message");

}

}catch(err){

alert("Server error");

}

});