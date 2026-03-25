// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  const res = await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });

  const result = await res.json();
  response.innerText = result.message;
});


// TYPING EFFECT
const texts = ["Full Stack Developer", "Backend Developer", "UI Enthusiast"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  current = texts[i];

  if (!deleting) {
    document.getElementById("typing").innerHTML = current.substring(0, j++);
    if (j > current.length) {
      deleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    document.getElementById("typing").innerHTML = current.substring(0, j--);
    if (j === 0) {
      deleting = false;
      i = (i + 1) % texts.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}

type();


// SCROLL REVEAL
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});
