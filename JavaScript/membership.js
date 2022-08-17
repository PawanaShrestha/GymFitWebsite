// Selecting the membership form and storing it in "form" variable

const form = document.querySelector("#membershipForm");


// adding Event listener to the form in submit
form.addEventListener('submit', (event)=>{
    // preventing the form to be reset initially
    event.preventDefault();

    // storing the form values in respective variables
    let fname = document.querySelector("#fname").value;
    let mname = document.querySelector("#mname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let pw = document.querySelector("#pw").value;
    let contact = document.querySelector("#contact").value;
    let tempAddress = document.querySelector("#tempAddress").value;
    let perAddress = document.querySelector("#perAddress").value;
    let occupation = document.querySelector("#occupation").value;
    let dob = document.querySelector("input[type = 'date']").value;
    let gender = document.querySelector('input[name = "gender"]:checked').value;


    // Formartting the values
    let data = { 
        firstName: fname, 
        middleName: mname,
        lastName: lname,
        email: email,
        password: pw,
        contactNumber: contact,
        dateOfBirth: dob,
        gender: gender,
        temporaryAddress: tempAddress,
        permanentAddress: perAddress,
        occupation: occupation
    };


    // storing the values in json server using promise
    axios.post('http://localhost:10/membership', data).then(()=>{
        alert("Thank you for applying! \nYour GYM Fit account has been created.");
    })

    // reseting the form after all actions performed
    event.target.reset();
})