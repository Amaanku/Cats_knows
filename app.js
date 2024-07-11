let URL = "https://cat-fact.herokuapp.com/facts";
let factspara = document.querySelector(".facts");
let btn = document.querySelector(".btn");
let imgContainer = document.querySelector(".img-container");
let meowSound = document.getElementById("meow-sound");

console.log("Facts: ", factspara);

if (factspara.innerHTML.trim() === '') {
  factspara.style.display = "none";
  imgContainer.style.display = "none";
}

const getRandomCatImage = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await response.json();
  const imageUrl = data[0].url;
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Random cat image";
  imgContainer.innerHTML = ""; // clear the container
  imgContainer.appendChild(img); // add the new image
  imgContainer.style.display = "block"; // ensure image container is displayed
};

const getFacts = async () => {
  console.log("Fetching facts...");
  let response = await fetch(URL);
  console.log("Response: ", response.status);
  let data = await response.json();
  console.log("Data: ", data[0].text);
  let idx = Math.floor(Math.random() * data.length);
  factspara.innerText = data[idx].text;
  factspara.style.display = "block";
};

btn.addEventListener("click", async () => {
  await getFacts();
  await getRandomCatImage();
  meowSound.play(); // play the meow sound
});
