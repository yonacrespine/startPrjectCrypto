(() => {
  "use strict";

  let coins = [];

  

  const HTMLPrincipal = document.getElementById("myDivResponse");

  Spa();
  searchCoin();
  ajaxRequestList();

  async function ajaxRequestList() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/");

    console.log(response);
    coins = await response.json();

    coins.forEach((coin) => {
      coin.isLiked = false;
      coin.iconLove=""
    });

    console.log(coins);

    displayList(coins, HTMLPrincipal);
  }

  function displayList(coins, placeToDisplay) {
   
    let html = "";

    for (let coin of coins) {
      html += `<div class="myDiv col-md-2 ">
                            <div class="buttonPreference" style="color:white">  Like?  


                                <div class="popup ">
                                    <div class="popup-container ">
                                        <div class="popupContent container-fluid">
                                            <div class="close-popup closeBtn"><a href="#">X</a></div>
                                            <div class="popupCoinLike row" style="color: black" >

                                              
                                            </div>
                                                
                                               
                                        </div>
                                    </div>
                                </div>


                                <div> <button class="buttonLike "> 👍</button></div>
                                <div> <button class="buttonUnLike"> 👎 </button></div>
                                <div class="iconLove">${coin.iconLove}</div>
                                <div class="idCoin" style="display: none">${coin.id}</div>

                            </div>

                                <div class="iconCoin"><image  src="${coin.image.small}" /> </div>
                                <div class="nameCoin"> ${coin.name}  <br> ${coin.symbol} </div>
                            


                                <button class="buttonMoreInfo custom-btn btn-2">More Info</button>
                            
                                <div class="spinner-border text-warning" style="display:none" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>

                                <div  class="price" id="${coin.id}"> </div>


                          
                            
                        </div>`;
    }

    placeToDisplay.innerHTML = html;

    getDomListers(coins);
    clickButtonLike();
  }

  function getDomListers(coins) {
    const buttonsMoreInfo = document.querySelectorAll(".buttonMoreInfo");

    buttonsMoreInfo.forEach((button, index) => {
      
      button.addEventListener("click", function () {
        button.style.opacity = 0;

        document.getElementsByClassName("spinner-border")[index].style.display =
          "block";

        setTimeout(() => {
          document.getElementsByClassName("spinner-border")[
            index
          ].style.display = "none";
        }, 100);

        setTimeout(() => {
          displayLId(coins, index);
        }, 100);
      });
    });
  }

  function displayLId(coins, index) {
    const coin = coins[index];

    const myDivPrice = document.getElementById(`${coin.id}`);
    myDivPrice.innerHTML = "";
    myDivPrice.innerHTML += `
            <span style="color:white">  ${coin.market_data.current_price.usd} $ </span>
            <br><span style="color:white">  ${coin.market_data.current_price.eur} €</span>
            <br><span style="color:white">  ${coin.market_data.current_price.ils} &#8362</span>`;
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

  function searchCoin() {
    const inputSearch = document.getElementById("inputSearch");

    inputSearch.addEventListener("keyup", function () {
      const textToSearch = this.value;

      if (textToSearch === "") {
        displayList(coins, HTMLPrincipal);
      } else {
        const filteredCoins = coins?.filter((coin) =>
          coin.name.toLowerCase().includes(textToSearch)
        );

        console.log(filteredCoins);

        displayList(filteredCoins, HTMLPrincipal);
      }
    });
  }


  let numberOfHearts = 0; // Initialiser le nombre de cœurs à 0
  

  function clickButtonLike() {
    const buttonLike = document.querySelectorAll(".buttonLike");
    const buttonUnLike = document.querySelectorAll(".buttonUnLike");
    const iconLove = document.querySelectorAll(".iconLove");
    const idCoin = document.querySelectorAll(".idCoin");


    
    

    buttonLike.forEach((button, index) => {
      button.addEventListener("click", function () {
        // alert("lister + ❤️" + index)
        if (numberOfHearts <= 4 && iconLove[index].innerHTML.trim() === "") {
          iconLove[index].innerHTML = "❤️";
          
          coins[index].isLiked = true;
          numberOfHearts++;

          coins.forEach(coin=>{
            if(coin.id=== idCoin[index].innerHTML){
            //  alert(index +"191 "+ iconLove[index].innerHTML+ "/"+ coin.name + "/" + coin.id )
              coin.iconLove="❤️"
            }
          })
          
        
          

          // coins[index].iconLove="❤️"

          console.log(numberOfHearts);
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
        alert("lister no + ❤️" + iconLove[index].innerHTML + "/")

        if (numberOfHearts > 0 && iconLove[index].innerHTML === "❤️") {
        // if (numberOfHearts > 0  ) {
          // alert(index+ "207"+ iconLove[index].innerHTML)
          iconLove[index].innerHTML = "";
          coins[index].isLiked = false 
          // alert("/" +idCoin[index].innerHTML + "/"+ "idCoin" )
          
          coins.forEach(coin=>{
            if(coin.id=== idCoin[index].innerHTML){
            //  alert(index +"213 "+ iconLove[index].innerHTML+ "/"+ coin.name )
              coin.iconLove=""
            }
          })
          
          numberOfHearts--;
          

          console.log(numberOfHearts);
        
        }
      });
    });
  }

  function displayPopup() {
    const popup = document.querySelector(".popup");
    const closeBtn = document.querySelector(".closeBtn");

    console.log(popup);

    popup.style.display = "block";

    const popupCoinLike = document.querySelector(".popupCoinLike");

    popupCoinLike.innerHTML = "";


    // popupCoinLike.innerHTML = `
    // <div class="row">
    //   <div class="col">
    //     <p>You only have the right to choose up to 5 coins!</p>
    //     <p>If you wish to change your choices, do so here then close this window 😊</p>
    //   </div>
    // </div>`



  
console.log(popupCoinLike.innerHTML)

    let coinsLiked = [];

    coins.forEach((coin) => {
      if (coin.isLiked == true) {
        coinsLiked.push(coin);
      }
     
      
    });

    
    // displayList(coinsLiked, popupCoinLike);
    

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    displayList(coins, HTMLPrincipal);

      

    });
  }

 
  

  



})();
