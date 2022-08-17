// JavaScript for the slideshow
var indexOfSlide = 0;
showSlides();

//function to make a slide show for the advertisements at the top
function showSlides(){
    let i;
    let slides = document.getElementsByClassName("slide-image");
    for (i = 0; i < slides.length; i++){
      slides[i].style.display = "none";
    }
    indexOfSlide++;
    if (indexOfSlide > slides.length){
      indexOfSlide = 1
    }
    slides[indexOfSlide - 1].style.display = "block";
    setTimeout(showSlides, 3000); //image changes in every 3 seconds
}



// class to show the products from json server to the webpage
class showProductsInPage{
  // the constructor to call the functions which shows the products
  constructor(){
    this.showProductItems();
    this.showNutritionItems();
    this.showEquipmentItems();
  }

// function to show the sale products
  showProductItems(){
    // products are gotten from the server
      axios.get('http://localhost:10/sale-products')
      .then(resp => resp.data) 
      //the response is stored in data
      .then(data =>{
          let productDetails = '';
          // loop goes through each data
          data.forEach(e => {

            productDetails += 
            `<div class="product"> 
              <div>
                <img src="${e.image}">
                <h4 style="color: #4281A4">${e.brand}</h4>
                <h2 data-id="${e.id}" onclick="showSaleProductsDescription(event)">${e.productName}</h2>
                <h3>Rs. ${e.price}</h3>
              </div>
              <button class="addToCart" id="${e.id}" onclick="addSaleProductToCart(this.id)">Add To Cart</button>
              <button class="buyNow" id="${e.id}" onclick="addNutritionToCart(this.id); theBuyButtonFunction()">Buy Now</button>
            </div>`;
                        
          });
          // the above formatted data are sent to the html file
          document.getElementById(`sale-products`).innerHTML = productDetails;
      })
                    
      .catch(error => {
        console.log(error);
      });   
        
  }


// function to show the nutrition products
  showNutritionItems(){
    // products are gotten from the server
      axios.get('http://localhost:10/nutrition-products')
      .then(resp => resp.data)
      //the response is stored in data
      .then(data => {

        let productDetails='';
        // loop goes through each data
        data.forEach(e => {

          productDetails += 
            `<div class="product">
              <div>
                <img src="${e.image}">
                <h4 style="color: #4281A4">${e.brand}</h4>
                <h2 data-id="${e.id}" onclick="showNutritionDescription(event)">${e.productName}</h2>
                <h3>Rs. ${e.price}</h3>
              </div>
              <button class="addToCart" id="${e.id}" onclick="addNutritionToCart(this.id)">Add To Cart</button>
              <button class="buyNow" id="${e.id}" onclick="addNutritionToCart(this.id); theBuyButtonFunction()">Buy Now</button>
            </div>`;
                        
        });
// the above formatted data are sent to the html file
        document.getElementById(`shop-nutrition`).innerHTML= productDetails;
      })
                    
      .catch(error => {
        console.log(error);
        });   
  }


  // function to show the nutrition products
  showEquipmentItems(){ 
// products are gotten from the server
      axios.get('http://localhost:10/equipment-products')
      .then(resp => resp.data)
      //the response is stored in data
      .then(data =>{
        let productDetails = '';
        // loop goes through each data
        data.forEach(e => {

          productDetails += 
            `<div class="product">
              <div>
                <img src="${e.image}">
                <h4 style="color: #4281A4">${e.brand}</h4>
                <h2 data-id="${e.id}" onclick="showEquipmentDescription(event)">${e.productName}</h2>
                <h3>Rs. ${e.price}</h3>
              </div>
              <button class="addToCart" id="${e.id}" onclick="addEquipmentToCart(this.id)">Add To Cart</button>
              <button class="buyNow" id="${e.id}" onclick="addEquipmentToCart(this.id); theBuyButtonFunction()">Buy Now</button>
            </div>`;
                        
        });

        // the above formatted data are sent to the html file
        document.getElementById(`shop-equipment`).innerHTML= productDetails;
      }) 
                    
      .catch(error => {
        console.log(error);
      });   
    }
}

// making object of above class showProductsInPage
const GYMFitProducts = new showProductsInPage();



// function to show the decription of the sale products 
function showSaleProductsDescription(e){
  // the description pop up is displayed
  const descriptionBox = document.querySelector(".description");
  descriptionBox.style.display = "block";

  // id of the clicked item is stored in variable id
  let id = e.target.dataset.id;
  axios.get('http://localhost:10/sale-products/'+id)
  .then(response => response.data)
  .then(data => {
    // data from server is stored in productDescription
    let productDescription = 
    `<div class="productDescription">
    <img src="${data.image}">
    <h4 style="color: #4281A4">${data.brand}</h4>
    <h2 onclick="showDescription(event)">${data.productName}</h2>
    <h3>Rs. ${data.price}</h3>
    <p> ${data.description} </p>
    </div>
    <img src="Pictures/Icons/cross.png" alt="cross" class="cross" onclick="closeDescription()">`

    // data is sent to html to be displayed
    descriptionBox.innerHTML = productDescription;
  });

}



// function to show the decription of the nutrition products 
function showNutritionDescription(e){
  // the description pop up is displayed
  const descriptionBox = document.querySelector(".description");
  descriptionBox.style.display = "block";

   // id of the clicked item is stored in variable id
  let id = e.target.dataset.id;
  axios.get('http://localhost:10/nutrition-products/'+id)
  .then(response => response.data)
  .then(data => {
    // data from server is stored in productDescription
    let productDescription = 
    `<div class="productDescription">
    <img src="${data.image}">
    <h4 style="color: #4281A4">${data.brand}</h4>
    <h2 onclick="showDescription(event)">${data.productName}</h2>
    <h3>Rs. ${data.price}</h3>
    <p> ${data.description} </p>
    </div>
    <img src="Pictures/Icons/cross.png" alt="cross" class="cross" onclick="closeDescription()">`

    // data is sent to html to be displayed
    descriptionBox.innerHTML = productDescription;
  });

}



// function to show the decription of the equipment products 
function showEquipmentDescription(e){
  // the description pop up is displayed
  const descriptionBox = document.querySelector(".description");
  descriptionBox.style.display = "block";

  // id of the clicked item is stored in variable id
  let id = e.target.dataset.id;
  axios.get('http://localhost:10/equipment-products/'+id)
  .then(response => response.data)
  .then(data => {
    // data from server is stored in productDescription
    let productDescription = 
    `<div class="productDescription">
    <img src="${data.image}">
    <h4 style="color: #4281A4">${data.brand}</h4>
    <h2 onclick="showDescription(event)">${data.productName}</h2>
    <h3>Rs. ${data.price}</h3>
    <p> ${data.description} </p>
    </div>
    <img src="Pictures/Icons/cross.png" alt="cross" class="cross" onclick="closeDescription()">`

    // data is sent to html to be displayed
    descriptionBox.innerHTML = productDescription;
  });

}


//fuction to close the description pop-up
function closeDescription(){
  document.querySelector(".description").style.display = "none";
}




// JavaScript to store the items in local storage as cartItems

// handling case if there is no cartItems key or the key is null
if(localStorage.getItem('cartItems') === null){
  var cartArray = [];
} else {
  // try and catch block if the cartArray does not have data in proper format
  try{
    cartArray = JSON.parse(localStorage.getItem('cartItems'));
  } catch(error){
    cartArray = [];
  } 
}


//fucntionality of the addToCart button of sale items
function addSaleProductToCart(clicked_id){
  // getting data from server
  axios.get("http://localhost:10/sale-products")
  .then((response) => {
    return response.data; 
  })
  .then((data) => {
    data.filter((item) => {
      if(item.id == clicked_id){
        let cartItem = {
          image: item.image,
          brand: item.brand,
          productName: item.productName,
          price: item.price 
        }; //formatting data

        alert(item.productName  + " has been added to cart.");

        //adding item to array
        cartArray.push(cartItem); 
        //storing array in local storage   
        localStorage.setItem('cartItems', JSON.stringify(cartArray));

      };
    })
  })
  .catch({});
}


//fucntionality of the addToCart button of nutrition items
function addNutritionToCart(clicked_id){
  //getting data from server
  axios.get("http://localhost:10/nutrition-products")
  .then((response) => {
    return response.data;
  })
  .then((data) => {
    data.filter((item) => {
      if(item.id == clicked_id){
        let cartItem = {
          image: item.image,
          brand: item.brand,
          productName: item.productName,
          price: item.price 
        }; //formatting data

        alert(item.productName  + " has been added to cart.");

        //adding item to array
        cartArray.push(cartItem);
        //storing in local storage     
        localStorage.setItem('cartItems', JSON.stringify(cartArray));

      };
    })
  })
  .catch({})
}


//fucntionality of the addToCart button of equipment items
function addEquipmentToCart(clicked_id){
  //getting data from server
  axios.get("http://localhost:10/equipment-products")
  .then((response) => {
    return response.data;
  }) 
  .then((data) => {
    data.filter((item) => {
      if(item.id == clicked_id){
        let cartItem = {
          image: item.image,
          brand: item.brand,
          productName: item.productName,
          price: item.price 
        }; //formatting data

        alert(item.productName  + " has been added to cart.");

        // adding item to array
        cartArray.push(cartItem);
        // storing array in local storage  
        localStorage.setItem('cartItems', JSON.stringify(cartArray));

      };
    })
  })
  .catch({});
}


//funtionality of the BUY NOW button
function theBuyButtonFunction(){
  // seleting the buy Now button
  let buyNowButton = document.querySelectorAll(".buyNow");
  //getting logged in user data from server
  axios.get("http://localhost:10/loggedInUserDetails")
  .then((response) => {
    //if there are no logged in users, go to login page
    if(response.data.length == 0){
      buyNowButton.addEventListener('click', window.location = "login.html");
    } 
    // else go to the cart page
    else {
      buyNowButton.addEventListener('click', window.location = "cart.html");
    }

  })
}