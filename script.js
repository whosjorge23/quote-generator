const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  loader.style.display = "block";
}

//Hide Loading
function complete() {
  if (loader.hidden == false) {
    quoteContainer.hidden = false;
    loader.hidden = true;
    loader.style.display = "none";
  }
}

//Get Quote From API
async function getQuote() {
  loading();
  const proxyUrl = "https://vast-temple-79026.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce Font Size For Long Quotes
    if (data.quoteText.lenght > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    //Stop Loader And Show Quote
    complete();
    //console.log(data);
  } catch (error) {
    getQuote();
    //console.log("Whoops, No Quotes", error);
  }
}

//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

//On Load
getQuote();
