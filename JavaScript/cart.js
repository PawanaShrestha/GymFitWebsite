// cartPage class for the cart items in the table
class cartPage{
    constructor(){
        this.cartItems = JSON.parse(localStorage.getItem("cartItems")); 
        this.showCartItems(); 
    }

    // to update the cart items table when any action(deletion) is performed
    updateCartItems(newCartList){
        localStorage.setItem("cartItems", JSON.stringify(newCartList));
    }

    // to show the cart items on the table retrieving data from localstorage
    showCartItems(){
        // condition if there are no elements in the cart. the noItems box is displayed
        if(this.cartItems === null || this.cartItems.length == 0){
            document.querySelector("#buyNow").style.display = "none";
            document.querySelector("#cartTable").style.display = "none";
            document.querySelector("#totalAmount").style.display = "none";
            document.querySelector("#noItems").style.display = "block";
        } 
        // if there are items in the cart stored in localstorage, it is retrieved and displayed in the cart
        else {
            document.querySelector("#noItems").style.display = "none";
            let itemsInCart = '';
            this.cartItems.forEach((item, index) => {
            itemsInCart += 
                `<tr>
                <td><img src="${item.image}"></td>
                <td><span style="font-size: smaller; color: #4281A4;"><u>${item.brand}</u></span>
                <br>${item.productName}</td>
                <td>Rs. ${item.price}</td>
                <td class="deletion" data-index="${index}">Remove</td>
                <tr>`

        });
        // calling the totalAmount function after all the cart items are displayed
        this.totalAmount();
    
        // displaying the itemsInCart information in the tableBody of the html
        document.querySelector("#tableBody").innerHTML = itemsInCart;
        } 
    } 

    // function to calculate the total amount of the cart items
    totalAmount(){
        let amount = 0.00;
        var totalAmount = '';
        //loop accessing each item 
        this.cartItems.forEach((item) =>{
            // only taking the price from the string
            let tempAmount = parseFloat(item.price);
            // adding the prices of the items
            amount += tempAmount;
        })

        //formatting the totalAmount to print in the page
        totalAmount = 
        `<span style="font-size: medium; font-family: 'Audiowide', cursive;">Total Amount: </span> Rs. ` + amount.toFixed(2) + " /-";

        document.querySelector("#totalAmount").innerHTML = totalAmount;
    }

    //function to remove the item from cart
    removeItemFromCart(indexNumberToRemove){
        //splicing the array to remove
        this.cartItems.splice(indexNumberToRemove, 1);
        //updating the array after removal of an item
        this.updateCartItems(this.cartItems);
        //showing the updated array
        this.showCartItems();
    }
}

//making an object of the class
const GYMFitCart = new cartPage;


//adding event listener to the "Remove" button
document.addEventListener('click', event => {
    if (event.target.classList.contains('deletion')) {
        var removeIndex = event.target.getAttribute('data-index');
        //asking for confirmation
        if (confirm("Are you sure you want to remove this item from cart?")) {
            //removing the particular element from array
            GYMFitCart.removeItemFromCart(removeIndex);
        }
    }
});

 

function showCustomerDetails(){
    //getting the customer details from json server
    axios.get('http://localhost:10/loggedInUserDetails')
    .then(response => {
        return response.data;
    })
    .then((data) => {
        let customerDetails = '';
        data.map(detail => {
            //formatting data
            customerDetails += 
            `
            <h4>Customer Name:</h4> 
            <h3>${detail.firstName} ${detail.middleName} ${detail.lastName}</h3>
            <h4>Contact Number:</h4> 
            <h3>${detail.contactNumber}</h3>
            <h4>Customer Address:</h4> 
            <h3>${detail.temporaryAddress}</h3>
            `

            document.getElementById("customerDetails").innerHTML = customerDetails;
        })
    })
    .catch({});
} 

//function to store the bought items in json server if the user confirms the purchase
function confirmation(){
    if (confirm("Your order has been placed. Thank you for shopping!")) {

        var itemsFromCart = JSON.parse(localStorage.getItem("cartItems"));
        itemsFromCart.forEach((item) => {
            let soldItems = {
                image: item.image,
                brand: item.brand,
                productName: item.productName,
                price: item.price
            };
            axios.post("http://localhost:10/soldItems", soldItems)
            .then()
            .catch((e) => console.log(e));
        });
        
        localStorage.removeItem('cartItems');
        window.location = "index.html";
    }
     
}


//function to show the pop-up when the BUY NOW is clicked
function showBuyDialogBox(){

    axios.get("http://localhost:10/loggedInUserDetails")
    .then((response) => {
        if(response.data.length == 0){
            window.location = "login.html";
        } else {
            showCustomerDetails();
            const theDialogBox = document.querySelector("#buyDialogBox");

            theDialogBox.style.display = "block";
        }
    })
 
};


//function to go to remove the loggedInUserDetails and let the user login from a different account
function logIntoAnotherAccount(){
    axios.delete("http://localhost:10/loggedInUserDetails/1")
    window.location = "login.html";   
}


//fucntion to close the pop-up when the cross is clicked
function closeBuyDialogBox(){
    document.querySelector("#buyDialogBox").style.display = "none";
}