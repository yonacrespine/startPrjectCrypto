(() => {
  "use strict"

  let coins = []


  const HTMLPrincipal = document.getElementById("myDivResponse")

  Spa()
  searchCoin()
  document.getElementsByClassName("spinner-grow")[0].style.display="block"
  ajaxRequestList()
  document.getElementsByClassName("spinner-grow")[0].style.display="none"


  async function ajaxRequestList() {

    try{

      const response = await fetch("assets/cryptoAPI100.json")

      coins = await response.json()
  
      coins.forEach((coin) => {
        coin.isLiked = false
        coin.iconLove=""
        coin.priceDollar=""
        coin.priceEuro=""
        coin.priceIls=""
        coin.timeCallApi=""
      })

      displayList(coins, HTMLPrincipal)

    }
    catch(err){
       err= "Failed to generate the display of coins"
      alert(err)
    }
   
  }

  function displayList(coins, placeToDisplay) {
   
    let html = ""

    for (let coin of coins) {
      html += `<div class="myDiv col-md-2 ">
                            


                                <div class="popup ">
                                    <div class="popup-container ">
                                        <div class="popupContent container-fluid">
                                            <div class="close-popup closeBtn"><a href="#">X</a></div>

                                            
                                            <div class="row">
                                              <div class="col paragraphPopup">
                                                <p> 🛑You only have the right to choose up to 5 coins!🛑</p>
                                                <p>If you wish to change your choices, do so here then close this window 😊</p>
                                              </div>
                                            </div>
                                          

                                            <div class="popupCoinLike row"></div>
                                             
                                               
                                        </div>
                                    </div>
                                </div>

                                <div class="buttonPreference" style="color:white">  Like?  
                                  <div> <button class="buttonLike "> 👍</button></div>
                                  <div> <button class="buttonUnLike"> 👎 </button></div>
                                  <div class="iconLove">${coin.iconLove}</div>
                                  <div class="idCoin" style="display: none">${coin.id}</div>
                                </div>

                                <div class="iconCoin"><image  src="${coin.image}" style="height:100px"/> </div>
                                <div class="nameCoin"> ${coin.name}  <br> ${coin.symbol} </div>
                            
                                <button class="buttonMoreInfo custom-btn btn-2">More Info</button>
                            
                                <div class="spinner-border text-warning" style="display:none" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>

                                <div  class="price" id="${coin.id}"> </div>


                          
                            
              </div>`
    }

    placeToDisplay.innerHTML = html

    displayPrice(coins)
    clickButtonLike()
  }

 

    function displayPrice(coins) {
   

    const buttonsMoreInfo = document.querySelectorAll(".buttonMoreInfo")

    buttonsMoreInfo.forEach((button, index) => {

      try{


       const coin = coins[index]
      button.addEventListener("click", async function () {

        const myDivPrice = document.getElementById(`${coin.id}`)

        if(!myDivPrice.innerHTML.includes("$")){

          document.getElementsByClassName("spinner-border")[index].style.display ="block"
          let localPriceDollar
          let localPriceEuro
          let localPriceIls



          let now1 = new Date()
          let timeNow= now1.getTime()
          let deltaTime= timeNow - coin.timeCallApi

          

            if(coin.timeCallApi==="" || deltaTime >120000){

          // call the API

          const response2= await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd%2Ceur%2Cils`)

         
           const coinCurrency = await response2.json()
         
              localPriceDollar=coinCurrency[coin.id].usd
              coin.priceDollar= localPriceDollar

              localPriceEuro= coinCurrency[coin.id].eur
              coin.priceEuro= localPriceEuro

              localPriceIls= coinCurrency[coin.id].ils
              coin.priceIls=localPriceIls

              let now= new Date()
              coin.timeCallApi= now.getTime()

          
          }
          else{
          //timeCallApi  not empty, not necessary to recall the API

            localPriceDollar= coin.priceDollar
            localPriceEuro= coin.priceEuro
            localPriceIls= coin.priceIls

        
          }

          myDivPrice.innerHTML =""
          myDivPrice.innerHTML +=`
          <span style="color:white">  ${localPriceDollar} $ </span>
          <br><span style="color:white">  ${localPriceEuro} €</span>
          <br><span style="color:white">  ${localPriceIls} &#8362</span>`

          document.getElementsByClassName("spinner-border")[index].style.display = "none"


        }
        else{
          myDivPrice.innerHTML =""

        }
      
     
      })
    }

    catch(error){
       error= "Failed to generate the display of coins"
      alert(error)
    }
    })
  }


  function Spa() {
    const sections = document.getElementsByTagName("section")
    const homeSection = document.getElementById("homeSection")

    
    //Hide all sections except the home section
    for (let i = 0; i < sections.length; i++) {
      sections[i].style.display = "none"
    }
    homeSection.style.display = "block"


    const links = document.getElementsByTagName("a")

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        const dataSection = this.dataset.section


        //Hide all sections
        for (let j = 0; j < sections.length; j++) {
          sections[j].style.display = "none"
        }

        // Show corresponding section
        document.getElementById(`${dataSection}`).style.display = "block"
      });
    }
  }

  function searchCoin() {
    const inputSearch = document.getElementById("inputSearch");

    inputSearch.addEventListener("keyup", function () {
      const textToSearch = this.value

      if (textToSearch === "") {
        displayList(coins, HTMLPrincipal)
      } else {
        const filteredCoins = coins?.filter((coin) =>
          coin.name.toLowerCase().includes(textToSearch)
        );

        displayList(filteredCoins, HTMLPrincipal)
      }
    })
  }


  let numberOfHearts = 0 
  

  function clickButtonLike() {
    const buttonLike = document.querySelectorAll(".buttonLike");
    const buttonUnLike = document.querySelectorAll(".buttonUnLike");
    const iconLove = document.querySelectorAll(".iconLove");
    const idCoin = document.querySelectorAll(".idCoin");


    buttonLike.forEach((button, index) => {
      button.addEventListener("click", function () {
        
        if (numberOfHearts <= 4 && iconLove[index].innerHTML.trim() === "") {

          iconLove[index].innerHTML = "❤️"


          numberOfHearts++;

          coins.forEach(coin=>{
            if(coin.id=== idCoin[index].innerHTML){
         
              coin.iconLove="❤️"
              coin.isLiked = true;
            }
          })
          
          
        } else if (
          numberOfHearts === 5 &&
          iconLove[index].innerHTML.trim() === ""
        ) {
         
          displayPopup();
        }
      });
    });

    

    buttonUnLike.forEach((button, index) => {
      button.addEventListener("click", function () {
      
        if (numberOfHearts > 0 && iconLove[index].innerHTML === "❤️") {
  
          iconLove[index].innerHTML = "";
         
          coins.forEach(coin=>{
            if(coin.id=== idCoin[index].innerHTML){
              coin.iconLove=""
              coin.isLiked=false
            }
          })
          
          numberOfHearts--;
        
        }
      });
    });
  }

  function displayPopup() {
    const popup = document.querySelector(".popup")
    const closeBtn = document.querySelector(".closeBtn")

    popup.style.display = "block"

    const popupCoinLike = document.querySelector(".popupCoinLike")

    let coinsLiked = [];

    popupCoinLike.innerHTML = ""

    coins.forEach((coin) => {
      if (coin.isLiked == true) {
        coinsLiked.push(coin)
      }
     
    })
    
    displayList(coinsLiked, popupCoinLike)
    

    closeBtn.addEventListener("click", () => {

      popup.style.display = "none"
      popup.innerHTML = ""

    displayList(coins, HTMLPrincipal)
    

    })

  }

 
})()
