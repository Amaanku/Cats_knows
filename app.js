let URL = "https://catfact.ninja/fact";
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
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    if (!response.ok) throw new Error("Failed to fetch cat image");
    const data = await response.json();
    const imageUrl = data[0].url;

    // Update the image container
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Random cat image";
    imgContainer.innerHTML = ""; 
    imgContainer.appendChild(img); 
    imgContainer.style.display = "block"; 
  } catch (error) {
    console.error("Error fetching cat image:", error);
    imgContainer.innerHTML = "<p>Could not load an image. Please try again!</p>";
  }
};
const getFacts = async () => {
  try {
    console.log("Fetching facts...");
    let response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch facts");
    console.log("Response: ", response.status);

    let data = await response.json();
    console.log("Data: ", data.fact);

    factspara.innerText = data.fact; // Display the fetched fact
    factspara.style.display = "block"; // Show the fact
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    factspara.innerText = "Could not load a fact. Please try again!";
    factspara.style.display = "block";
  }
};

btn.addEventListener("click", async () => {
  await getFacts();
  await getRandomCatImage();
  if (meowSound) {
    meowSound.play(); // Play the meow sound
  }
});