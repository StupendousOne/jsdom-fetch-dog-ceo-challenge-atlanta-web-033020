console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

let BREEDSARRAY = [];

document.addEventListener('DOMContentLoaded', function () {
  init();
})

function init() {
  getImages(imgUrl);
  getBreeds(breedUrl);
}

function getImages(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(json => writeImages(json))
}

function getBreeds(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      writeBreeds(json);
      filterBreeds();
    });
}

function writeImages(json) {
  const imageContainer = document.querySelector('#dog-image-container');
  const images = json.message;
  images.forEach(imageUrl => {
    let imageTag = document.createElement('img');
    imageTag.src = imageUrl;
    imageContainer.appendChild(imageTag);
  });
}

function writeBreeds(json) {
  const breedsContainer = document.querySelector('#dog-breeds');
  const breeds = json.message;

  for (key in breeds) {
    if (breeds[key].length > 0) {
      breeds[key].forEach(breed => {
        let li = document.createElement('li');
        li.innerText = `${breed} ${key}`;
        changeColor(li);
        BREEDSARRAY.push(li);
        breedsContainer.appendChild(li);
      })
    } else {
      let li = document.createElement('li');
      li.innerText = `${key}`;
      changeColor(li);
      BREEDSARRAY.push(li);
      breedsContainer.appendChild(li);
    }
  }
}

function changeColor(node) {
  node.addEventListener('click', function () {
    node.style = 'color:green';
  })
}

function filterBreeds() {
  const breedsContainer = document.querySelector('#dog-breeds');
  const breedsFilter = document.querySelector('#breed-dropdown');
  breedsFilter.addEventListener('change', function () {
    while (breedsContainer.firstChild) {
      breedsContainer.removeChild(breedsContainer.firstChild);
    }
    BREEDSARRAY.forEach(breed => {
      if (breed.innerHTML[0].toLowerCase() === breedsFilter.value.toLowerCase()) {
        breedsContainer.appendChild(breed);
      }
    })
  });
}