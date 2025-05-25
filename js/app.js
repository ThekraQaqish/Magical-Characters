console.log("fetchData started");

const CardContainer = document.getElementById("CardContainer");
const loadMoreBtn=document.getElementById("load-more");

let AllCharacters=[];
function fetchData(){
    fetch("https://hp-api.onrender.com/api/characters")
    .then(
        (data) => {
            if(!data.ok){
                throw new Error("The response !=200");
            }
            return data.json();
        }
    )
    .then(
        (jsondata) => {
            console.log("check what is in the jsonData",jsondata);
            AllCharacters=jsondata;
            filtering(jsondata);
            visibleCharacters = jsondata;
            LoadMore();
            loadMoreBtn.addEventListener("click",LoadMore);
        }
    )
    .catch((error) => {
        console.log("error cathed here",error);
        CardContainer.innerHTML= "<p>There is error here</p>";
    })
}
function RenderData(jsondata){
    jsondata.forEach((element) => {
        const card = document.createElement("div");
        const modalCard = document.createElement("div");
        const cardFrame= document.createElement("div");
        cardFrame.appendChild(card);
        cardFrame.className="cardFrame";
        card.className="card";
        card.setAttribute("house",element.house || "none");
    card.innerHTML=`
        <img src="${element.image}">
        <div class="card-content">
            <p class="name"> ${element.name}</p>
            <p>${element.house}</p>
            <p>${element.dateOfBirth}</p>
        </div>
    `
    modalCard.innerHTML=`
        <div class="card-content">
            <p>id: ${element.id}</p>
            <p>Alternate Names: ${element.alternate_names.join(" • ")}</p>
            <p>Species: ${element.species}   Alive: ${element.alive}</p>
            <p>Gender: ${element.gender}   wizard: ${element.wizard}</p>
            <p>Ancestry: ${element.ancestry}   Patronus: ${element.patronus}</p>
            <p>Eye Colour: ${element.eyeColour}   Hair Colour:${element.hairColour}</p>
            <p>wand: $Wood: ${element.wand.wood}  Core: ${element.wand.core}  Length: ${element.wand.length}</p>
            <p>hogwarts Student: ${element.hogwartsStudent}   hogwarts Staff: ${element.hogwartsStaff}</p>
            <p>Actor: ${element.actor}</p>
            <p>Alternate Actors: ${element.alternate_actors}</p>
        </div>
    `
    const imgElement = card.querySelector("img");

    if(element.image===""){
        imgElement.src="images/not-found.png";
    }

    element.cardFrame=cardFrame;
    CardContainer.appendChild(cardFrame);

    const modal=document.getElementById("modal");
    const closeModal=document.getElementById("closeModal");
    cardFrame.addEventListener("click",function(){
        modal.style.display="block";
        const cardColor = window.getComputedStyle(card).backgroundColor;
        const textColor = window.getComputedStyle(card).color;

        modal.style.backgroundColor = cardColor;
        modal.style.color = textColor;
        modal.appendChild(cardFrame);
        card.appendChild(modalCard);
    })
    closeModal.addEventListener("click",function(){
        modal.style.display="none";
        modal.innerHTML = "";
        modal.appendChild(closeModal);
    })

    });
}

fetchData();
let visibleCharacters=[];

function filtering(jsondata){
    const lis = document.getElementsByTagName("li");
    Array.from(lis).forEach(li => {
        li.addEventListener("click", function(){
            visibleCharacters = [];

            jsondata.forEach(element => {
                if (li.id === "all" || element.house === li.id) {
                    visibleCharacters.push(element);
                }
            });

            CardContainer.innerHTML = "";  
            currentIndex = 0;

            if (visibleCharacters.length > 16) {
                loadMoreBtn.style.display = "block";
            } else {
                loadMoreBtn.style.display = "none";
            }

            LoadMore();
        });
    });
}


let currentIndex = 0;
function LoadMore(){
    const nextItems = visibleCharacters.slice(currentIndex, currentIndex + 16);
    RenderData(nextItems);
    currentIndex += 16;

    if (currentIndex >= visibleCharacters.length) {
        loadMoreBtn.style.display = "none";
    }
}


const dropdownbtn=document.getElementById("dropdownbtn");
const dropdowncontent=document.getElementById("dropdown-content");
dropdownbtn.addEventListener("click",()=>{
    if(dropdowncontent.style.display==='none'){
        dropdowncontent.style.display='block';
    }
    else{
        dropdowncontent.style.display='none';
    }
})


// let Gryffindor =[];
// let Slytherin=[];
// let Hufflepuff=[];
// let Ravenclaw=[];
// let noNameHouse =[];

// function filtering(jsondata){
//     jsondata.forEach(
//         (element)=> {
//             if(element.house==="Gryffindor"){
//                 Gryffindor.pop(element.id);
//             }
//             else if(element.house==="Slytherin"){
//                 Slytherin.pop(element.id);
//             }
//             else if(element.house==="Hufflepuff"){
//                 Hufflepuff.pop(element.id);
//             }
//             else if(element.house==="Ravenclaw"){
//                 Ravenclaw.pop(element.id);
//             }
//             else{
//                 noNameHouse.pop(element.id);
//                 }
//         }
//     )

//     jsondata.forEach(
//             (element)=>{
//         if(Gryffindor.includes(element.id)){
//             element.card.style.backgroundColor="#7f0909";
//         }
//         else if(Slytherin.includes(element.id)){
//             element.card.style.backgroundColor=
//         }
//         else if(Hufflepuff.includes(element.id)){
//             element.card.style.backgroundColor=
//         }
//         else if(Ravenclaw.includes(element.id)){
//             element.card.style.backgroundColor=
//         }
//         else{
//             element.card.style.backgroundColor=
//         }
//         })

// }



// const dropdownbtn=document.getElementById("dropdownbtn");
// const dropdowncontent=document.getElementById("dropdown-content");

// dropdownbtn.addEventListener("click",function(){
//     if (dropdowncontent.style.display==="block"){
//         dropdowncontent.style.display="none";
//     }
//     else{
//         dropdowncontent.style.display="block";
//     }
// })