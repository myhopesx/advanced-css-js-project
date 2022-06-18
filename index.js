const subscribeButton = document.getElementById("btn3");
const emailField = document.getElementById("email");

subscribeButton.addEventListener("click", (e) => checkEmail(emailField.value));

function checkEmail(email) {
  console.log(email);
  fetch(`https://api.apilayer.com/email_verification/${email}`, {
    headers: { apikey: "8Kv28u2j6Y81t11yYURpPuy9viTPw1QY" },
  })
    .then((Response) => {
      // beacuase this API only accept 20 request per day so please
      if (Response.status === 429) {
        document.alert("please try tomorrow!");
      }
      return Response.json();
    })

    .then((data) => {
      let textDive = document.getElementById("textDive");
      let p = document.createElement("p");

      if (!data.is_deliverable) {
        p.innerText = "Please Enter valid email!";
        p.style.paddingTop = "1.3rem";
        p.style.color = "red";
        p.style.fontSize = "1rem";
        textDive.appendChild(p);
      } else {
        p.innerText = "Thank You for Your Subscription";
        p.style.paddingTop = "1.3rem";
        p.style.color = "#e0afa0";
        p.style.fontSize = "1rem";
        textDive.appendChild(p);

        // web API storage (please check inspect > application > local storage to see this email )
        window.localStorage.setItem("email", email);
      }
    });
}
