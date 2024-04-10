const button = document.querySelector(".button");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

function getQuote() {
   let api = `https://api.quotable.io/random`;
   fetch(api)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         quote.content = data.content;
         quote.author = data.author;
      })
      .then(function () {
         displayQuote();
      })
      .catch(function (error) {
         console.log(error);
      });
}

function displayQuote() {
   quote.innerHTML = `${quote.content}`;
   author.innerHTML = `${quote.author}`;
}

button.addEventListener("click", function () {
   getQuote();
});

getQuote();