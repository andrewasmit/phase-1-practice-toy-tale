let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// ________________________________________________________________
// Where my code begins
// ________________________________________________________________

const toyCollectionDiv = document.querySelector('#toy-collection');


fetch('http://localhost:3000/toys')
.then(res=>res.json())
.then(data=>cardHandler(data));

function cardHandler(e){
  for (toy of e){
    createCard(toy);
  }
}

function createCard(e){
  let div = document.createElement('div');
  div.innerHTML = 
    // `<div class="card"> 
    // <h2>${e.name}</h2>
    // <img src = ${e.image} class = "toy-avatar" />
    // <p>${e.likes} Likes</p>
    // <button class = "like-btn" id = "[${e.id}]" onclick="likeHandler(e)">Like ❤️</button>
    // </div>`;
  div.className = 'card';
  div.innerHTML = 
    `<h2>${e.name}</h2>
    <img src = ${e.image} class = "toy-avatar" />
    <p>${e.likes} Likes</p>`;
    let btn = document.createElement('button');
    btn.innerText='Like ❤️';
    btn.className = 'like-btn';
    btn.addEventListener('click', likeHandler)
    div.appendChild(btn);
    toyCollectionDiv.appendChild(div);
    // const likeBtns = document.querySelectorAll('.like-btn');
}


function likeHandler(e){
  console.log(e.target)
}

// document.addEventListener('DOMContentLoaded', ()=>{
// const likeBtns = document.querySelectorAll('.like-btn');
// const likeBtnArr = Array.from(likeBtns)
// // .forEach(btn=>{
// //   return btn.addEventListener('click', console.log('hi'))
// // })

// console.log(likeBtns)
// })

