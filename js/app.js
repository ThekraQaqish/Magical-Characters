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
            LoadMore(jsondata);
            loadMoreBtn.addEventListener("click",()=>LoadMore(jsondata));
            filtering(jsondata);
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
    const imgElement = card.querySelector("img");

    if(element.image===""){
        imgElement.src="images/not-found.png";
    }

    element.cardFrame = cardFrame;

    CardContainer.appendChild(cardFrame);
    });
}

fetchData();

function filtering(jsondata){
    const lis = document.getElementsByTagName("li");
    Array.from(lis).forEach(li => {
        li.addEventListener("click", function(){
            jsondata.forEach(element => {
                element.cardFrame.style.display = "none"; 
                if(element.house === li.id){
                    element.cardFrame.style.display = "block"; 
                }
                if(li.id==="all"){
                    element.cardFrame.style.display = "block";
                }
            });
        });
    });
}

let currentIndex = 0;
function LoadMore(AllCharacters){
    const chunk=AllCharacters.slice(currentIndex,currentIndex+16);
    RenderData(chunk);
    // console.log("currentIndex:", currentIndex);
    // console.log("AllCharacters.length:", AllCharacters.length);
    currentIndex+=16;
    if(currentIndex>=AllCharacters.length){
        loadMoreBtn.style.display="none";
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