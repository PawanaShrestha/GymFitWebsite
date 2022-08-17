// JavaScript to record the data of the booking seat form 

// storing the form in variable 'form'
const form = document.querySelector("#bookASeatForm");

form.addEventListener('submit', (event)=>{
    // preveting the form to be reset at first 
    event.preventDefault();

    // storing the form data in variables
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let contact = document.querySelector("#phnum").value;
    let gender = document.querySelector('input[name = "gender"]:checked').value;
    let classType = document.querySelector('input[name= "class"]:checked').value;
    let date = document.querySelector("input[type = 'date']").value;
    let time = document.querySelector('input[name= "time"]:checked').value;

    // formatting the data
    let data = {
        firstName: fname,
        lastName: lname,
        email: email,
        contactNumber: contact,
        gender: gender,
        typeOfClass: classType,
        bookedforDate: date, 
        time: time
    };

    //storing the data in json server
    axios.post('http://localhost:10/seatBooked', data)
    .then(()=>{
        // alerting after the form is submitted
        alert("Your seat has been booked. See you soon!");
    }).catch({});
    
    // reseting the form after the data has been recorded
    event.target.reset();
})