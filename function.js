(()=>{

    "use strict"


   

    let coins=[]
   

    Spa()
    searchCoin()
    ajaxRequestList()

   

    async function ajaxRequestList(){

        const response= await fetch("https://api.coingecko.com/api/v3/coins/")
      
        console.log(response)
        coins= await response.json()

        console.log(coins)

        displayList(coins)

    }

    function displayList(coins){

        const myDivResponse= document.getElementById("myDivResponse")

        let html=""
        
      
        
        for(let coin of coins){
                            html+= `<div class="myDiv ">
                            <div class="buttonPreference" style="color:white">  Like?  
                                <div> <button class="buttonLike"> 👍</button></div>
                                <div> <button class="buttonUnLike"> 👎 </button></div>
                                <div class="iconLove"> </div>
                            </div>

                                <div class="iconCoin"><image  style="height:100px; width:100px" src="${coin.image.small}" /> </div>
                                <div class="nameCoin"> ${coin.name}  <br> ${coin.symbol} </div>
                            


                                <button class="buttonMoreInfo custom-btn btn-2">More Info</button>
                            
                                <div class="spinner-border text-warning" style="display:none" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>

                                <div  class="price" id="${coin.id}"> </div>


                          
                            
                        </div>`



        }
            
            






            


        

        myDivResponse.innerHTML= html

        
        getDomListers(coins)
        clickButtonLike()
    }


 


   






    function getDomListers(coins) {
        const buttonsMoreInfo = document.querySelectorAll(".buttonMoreInfo");

        
    
        buttonsMoreInfo.forEach((button, index) => {  // create an index so that each press of the more info button gives us information only from the corner in question
            button.addEventListener("click", function () {
                button.style.opacity=0

               

                document.getElementsByClassName("spinner-border")[index].style.display="block"

                setTimeout(()=>{
                    document.getElementsByClassName("spinner-border")[index].style.display="none"
                   
                },100)
               
                setTimeout(()=>{
                    displayLId(coins, index)
                },100)
                
                
            });
        });
    }




    function displayLId(coins, index){

        const coin = coins[index]
        

            const myDivPrice= document.getElementById(`${coin.id}`)
            myDivPrice.innerHTML=""
            myDivPrice.innerHTML+= `
            <span style="color:white">  ${coin.market_data.current_price.usd} $ </span>
            <br><span style="color:white">  ${coin.market_data.current_price.eur} €</span>
            <br><span style="color:white">  ${coin.market_data.current_price.ils} &#8362</span>`


        

        

       
        
            
        }


    function Spa() {
        const sections = document.getElementsByTagName("section");
        const homeSection = document.getElementById("homeSection");
    
        // Cacher toutes les sections sauf la section d'accueil
        for (let i = 0; i < sections.length; i++) {
            sections[i].style.display = "none";
        }
        homeSection.style.display = "block";
    
        // Ajouter un écouteur d'événements à chaque lien
        const links = document.getElementsByTagName("a");
        
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function () {
                const dataSection = this.dataset.section;
                
                // Cacher toutes les sections
                for (let j = 0; j < sections.length; j++) {
                    sections[j].style.display = "none";
                }
                
                // Afficher la section correspondante
                document.getElementById(`${dataSection}`).style.display = "block";
            });
        }
    }
    
 
 
  

    function searchCoin(){
        const inputSearch= document.getElementById("inputSearch")
      
        inputSearch.addEventListener("keyup", function(){
            const textToSearch= this.value
            
            

            if(textToSearch === "") {
               

                displayList(coins)
                
            }
            else {
                const filteredCoins = coins?.filter(coin => coin.name.toLowerCase().includes(textToSearch))
                

                displayList(filteredCoins)
                
            }


        })
    }




function clickButtonLike() {
    const buttonLike = document.querySelectorAll(".buttonLike");
    const buttonUnLike = document.querySelectorAll(".buttonUnLike");
    const iconLove = document.querySelectorAll(".iconLove");

    let numberOfHearts = 0 // Initialiser le nombre de cœurs à 0
   

    
   
    buttonLike.forEach((button, index) => {
       
        button.addEventListener("click", function () {
            if ( numberOfHearts <=4 && iconLove[index].innerHTML.trim() === "") {
                
                iconLove[index].innerHTML = "❤️"
                numberOfHearts++
                console.log(numberOfHearts)

                
            }
            else {
               
                    alert("nombre de coeur superieur a 5")
                    

                    }
            })

        });
    

    buttonUnLike.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (numberOfHearts > 0 && iconLove[index].innerHTML === "❤️") {
                iconLove[index].innerHTML = ""
           
                numberOfHearts--
                console.log(numberOfHearts)
            
            }
           
        });

       
    });



   
}
























})()
