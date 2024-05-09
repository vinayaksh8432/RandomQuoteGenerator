const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const loading = document.getElementById("loadingspinner");
const quoteContainer = document.getElementById("quoteContainer");
const copyButton = document.querySelector(".copy");

copyButton.addEventListener("click", copy);

var circularCursor = document.getElementById("circularcursor"),
   cursorScale = document.querySelectorAll(".cursorScale");

window.addEventListener("mousemove", function (e) {
   circularCursor.style.display = "flex";
   circularCursor.style.left = e.pageX + "px";
   circularCursor.style.top = e.pageY + "px";
});

document.addEventListener("click", function (e) {
   if (e.target.tagName !== "IMG" && e.target.tagName !== "P") {
      getQuote();
   }
});

async function getQuote() {
   loading.style.display = "flex";
   quoteContainer.style.display = "none";
   let api = `https://api.quotable.io/random?maxLength=50`;
   fetch(api)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         quote.innerHTML = ` ${data.content}&nbsp;❜❜`;
         author.innerHTML = `${data.author}`;
      })
      .catch(function (error) {
         console.log(error);
      })
      .finally(function () {
         loading.style.display = "none";
         quoteContainer.style.display = "block";
      });
}

getQuote();

cursorScale.forEach((link) => {
   link.addEventListener("mouseleave", () => {
      circularCursor.classList.remove("shrink");
      cursorText.style.display = "flex";
      circularcursor.style.backgroundColor = "#81aaff";
      circularcursor.style.mixBlendMode = "difference";
   });
   link.addEventListener("mousemove", () => {
      circularCursor.classList.add("shrink");
      circularcursor.style.backgroundColor = "#a7c1d4";
      circularcursor.style.mixBlendMode = "overlay";
      cursorText.style.display = "none";
   });
});

function copy() {
   const textToCopy = `${quote.textContent}`.trim();

   const tempInput = document.createElement("textarea");
   tempInput.value = textToCopy;
   document.body.appendChild(tempInput);
   tempInput.select();
   document.execCommand("copy");
   document.body.removeChild(tempInput);

   const copyShowDiv = document.querySelector(".copy");
   const copiedDiv = document.querySelector(".copied");

   const copyShowDisplay = window
      .getComputedStyle(copyShowDiv)
      .getPropertyValue("display");

   if (copyShowDisplay === "flex") {
      copyShowDiv.style.display = "none";
      copiedDiv.style.display = "flex";
      setTimeout(() => {
         copyShowDiv.style.display = "flex";
         copiedDiv.style.display = "none";
      }, 3000);
   } else {
      copyShowDiv.style.display = "flex";
      copiedDiv.style.display = "none";
   }
}
