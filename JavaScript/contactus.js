// selecting the contact Form
let form = document.querySelector("#contactForm");

//adding event listener to the form when submitted
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let contact = document.querySelector("#contact").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;

    //formatting data
    let data = {
        firstName: fname, 
        lastName: lname,
        contactNumber: contact,
        email: email,
        message: message
    };

    //storing data in json server
    axios.post('http://localhost:10/contactUs', data)
    .then(()=>{
        alert("Thank you very much! \n Your response has been recorded.");
    }).catch((error)=>{
        console.log(error);
    });

    event.target.reset();
})