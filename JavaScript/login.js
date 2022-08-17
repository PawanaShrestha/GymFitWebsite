// selecting the login form and keeping it in a variable form
var form = document.querySelector("#login-form");


// Adding event listener to the form when submitted
form.addEventListener('submit', (event)=>{
    // prevent the form to reset at first
    event.preventDefault();

    // storing values of email and password
    let email = document.querySelector("#email").value;
    let pw = document.querySelector("#pw").value;

    // comparing the validity of the username and password in the stored data
    axios.get('http://localhost:10/membership') 
    .then((response)=>{
        return response.data;
    }).then((data)=>{
        let userInfo = data.filter((item)=>{
            return (item.email == email) && (item.password == pw); 
        });

        // condition to apply if the username exists in the database
        if(userInfo.length > 0){ 
            data.filter((item)=>{
                if((item.email == email) && (item.password == pw)){
                    let information = {
                    firstName: item.firstName,
                    middleName: item.middleName,
                    lastName: item.lastName,
                    contactNumber: item.contactNumber,
                    temporaryAddress: item.temporaryAddress
                };
            
                axios.post('http://localhost:10/loggedInUserDetails', information)
            };
                    
            })

            window.location = "cart.html";
        } 
        // if the username or password do not match, alert the user
        else{
            alert("Username or Password incorrect");
        }

    })

    // reset the form after all actions performed
    event.target.reset();
})