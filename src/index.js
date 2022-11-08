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
const newSubmitBtn = document.querySelector('#new-toy-form')

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
  div.className = 'card';
  div.innerHTML = 
    `<h2>${e.name}</h2>
    <img src = ${e.image} class = "toy-avatar" />
    <p>${e.likes} Likes</p>`;
    let btn = document.createElement('button');
    btn.innerText='Like ❤️';
    btn.className = 'like-btn';
    btn.id = `${e.id}`
    btn.addEventListener('click', ()=>{
      e.likes += 1;
      div.querySelector('p').textContent = `${e.likes} Likes`;
      likeHandler(e);
    })
    div.appendChild(btn);
    toyCollectionDiv.appendChild(div);
}


function likeHandler(e){
  fetch(`http://localhost:3000/toys/${e.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(e)
  })
  .then(res=>res.json())
  .then(data=>console.log(data));

}





newSubmitBtn.addEventListener('submit', submitHandler)

function submitHandler(e){
  e.preventDefault();
  console.log(e.target);
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  };
   createCard(toyObj);
   postNewToy(toyObj);
}

function postNewToy(toy){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res=>res.json())
  .then(data=>console.log(data));
}