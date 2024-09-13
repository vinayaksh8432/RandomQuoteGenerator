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

let canGenerateQuote = true;

document.addEventListener("click", function (e) {
    if (
        e.target.tagName !== "IMG" &&
        e.target.tagName !== "P" &&
        canGenerateQuote
    ) {
        canGenerateQuote = false;
        getQuote();
        setTimeout(() => {
            canGenerateQuote = true;
        }, 2000);
    }
});

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getQuote() {
    try {
        loading.style.display = "flex";
        quoteContainer.style.display = "none";

        await delay(200);

        let api = `https://randomquotegeneratorapi.up.railway.app/api/quote`;
        const response = await fetch(api);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        quote.innerHTML = ` ${data.content}&nbsp;❜❜`;
        author.innerHTML = `${data.author}`;
    } catch (error) {
        console.error("Error fetching quote:", error);
        quote.innerHTML = "An error occurred while fetching the quote.";
        author.innerHTML = "Please try again later.";
    } finally {
        loading.style.display = "none";
        quoteContainer.style.display = "block";
    }
}

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
        }, 500);
    } else {
        copyShowDiv.style.display = "flex";
        copiedDiv.style.display = "none";
    }
}

getQuote();
