let pageNumber = 2
// Get the entry point to the website
const header = document.querySelector('header');
const section = document.querySelector('section');

// Create elements to populate the header
const siteTitle = document.createElement('h2');
const siteDescription = document.createElement('p');
const rule = document.createElement('hr');

// Create an unordered list tag in the section tag
const bullets = document.createElement('ul');

// Values for header population
siteTitle.textContent = 'Hacker News';
siteDescription.textContent = 'Realtime Everything News powered by News API';

// Append elements to the header
header.appendChild(siteTitle);
header.appendChild(siteDescription);
header.appendChild(rule);

// Append element to section
section.appendChild(bullets);


const apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=8edde0574a9e4f15a15452b9fc5e0936&pageSize=100&page=1', true);
apiRequest.onload = function() {
	if (apiRequest.status >= 200 && apiRequest.status < 400) {
		const apiResponse = JSON.parse(apiRequest.response);
		displayResult(apiResponse);
	} else {
		console.log("We connected to the server but encountered an error")
	}
};

apiRequest.onerror = function(){
	console.log("Connection Error");
}
apiRequest.send();

function yHandler(){

	let screen = document.getElementById('screen');
	// Gets the page content height
	let contentHeight = screen.offsetHeight;
	// Gets the vertical scroll position
	let yOffset = window.pageYOffset;
	let y = yOffset + window.innerHeight;
	if(y >= contentHeight){
		// Ajax call to get more dynamic data goes here

		apiRequest.open('GET', 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=8edde0574a9e4f15a15452b9fc5e0936&pageSize=100&page='+ pageNumber, true);
        apiRequest.onload = function() {
	        if (apiRequest.status >= 200 && apiRequest.status < 400) {
		        const apiResponse = JSON.parse(apiRequest.response);
		        displayResult(apiResponse);
		        section.appendChild('loading ...');
	        } else {
		        console.log("We connected to the server but encountered an error")
	        }
        };
        apiRequest.onerror = function(){
	        console.log("Connection Error");
        }
    apiRequest.send();
    pageNumber++;
	}
}
window.onscroll = yHandler;

if (pageNumber > 800) {
    section.appendChild('End of Content');;
}


function displayResult(newsFeed) {
	const news = newsFeed['articles'];
	for (i = 0; i < news.length; i++) {
		console.log(news[0].title);
	    const item = document.createElement('li');
	    const anchor = document.createElement('a');
	    anchor.setAttribute('href', news[i].url);
	    anchor.setAttribute('target', '_blank');
	    const headline = document.createElement('h3');
	    headline.textContent = news[i].title;
	    const newDescription = document.createElement('article');
	    newDescription.textContent = news[i].description;
	    const others = document.createElement('samp');
	    others.textContent = 'Author:- ' + news[i].author + ' | Source:- '+ news[i].source.name + ' | Published:- ' + news[i].publishedAt;

        anchor.appendChild(headline);
	    item.appendChild(anchor);
	    item.appendChild(newDescription)
	    item.appendChild(others);
	    bullets.appendChild(item);
	}
}


