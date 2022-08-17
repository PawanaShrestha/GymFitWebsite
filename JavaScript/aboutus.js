
// the javascript codes display the pop-up to enlarge image when clicked
var y = document.querySelector("#viewImage");
    
for (let i = 1; i < 25; i++){
    var x = document.getElementById("thegym" + i);
        
    // function to show that particular image when clicked
    x.onclick = function() { 
        y.style.display = "flex"; 

        let theURL = "Pictures/Gallery/thegym" + i + ".jpg";
        
        let theImage = 
        `<img src="${theURL}" class="enlargedImage">
        <img src="Pictures/Icons/cross.png" alt="cross" class="cross" onclick="closeEnlargedImage()">`;
        document.getElementById(`viewImage`).innerHTML = theImage;
 
    } 
}  


// function to close the enlarged Image pop-up
function closeEnlargedImage(){ 
    y.style.display = "none";
}