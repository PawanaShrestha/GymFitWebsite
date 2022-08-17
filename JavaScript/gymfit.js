// Function to show the hamburger nav bar when the max width is 600px
function showNavBars() {
    var x = document.getElementById("navBar");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav"; 
    }
}  
 

// storing the newsletter form in a variable
let newsletterEmail = document.querySelector("#emailForNewsletter");

newsletterEmail.addEventListener('submit', (event)=>{
    //preventing the form to be reset
    event.preventDefault();

    // storing the email value in a variable
    let email = document.querySelector("#newsletterEmail").value;

    let data = { 
        emailForNewsletter: email
    }; //formatting data

    // storing in json server
    axios.post('http://localhost:10/newsletter', data)
    .then(()=>{
        alert("Congratulations on subscribing the GYM Fit newsletter!!!");
    })

    //resetting the form
    event.target.reset();
})
