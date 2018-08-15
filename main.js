let pageNumber = 2
const accessright = '8edde0574a9e4f15a15452b9fc5e0936';
// Get the entry point to the website
const header = document.querySelector('header');
const section = document.querySelector('section');

// Create elements to populate the header
const siteTitle = document.createElement('h2');
const siteDescription = document.createElement('p');
const rule = document.createElement('hr');

// Create an unordered list tag in the section tag
const bullets = document.createElement('ul');

let mySub = 'Realtime Everything News powered by <a href="newsapi.org" target="_blank">News API</a>'

// Values for header population
siteTitle.textContent = 'Hacker News';
siteDescription.insertAdjacentHTML('beforeend', mySub);

// Append elements to the header
header.appendChild(siteTitle);
header.appendChild(siteDescription);
header.appendChild(rule);

// Append element to section
section.appendChild(bullets);


const apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey='+accessright+'&pageSize=100&page=1', true);
apiRequest.onload = function() {
	if (apiRequest.status >= 200 && apiRequest.status < 400) {
		const apiResponse = JSON.parse(apiRequest.response);
		displayResult(apiResponse);
	} else {
		const serverError = window.open('servererror.html','Error','height=400,width=200');
	    if (window.focus) {
		    serverError.focus()
	    }
	}
};

apiRequest.onerror = function(){
	const connectionError = window.open('connectionerror.html','Error','height=400,width=200');
	if (window.focus) {
		connectionError.focus()
	}
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

		apiRequest.open('GET', 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey='+accessright+'&pageSize=100&page='+ pageNumber, true);
        apiRequest.onload = function() {
	        if (apiRequest.status >= 200 && apiRequest.status < 400) {
		        const apiResponse = JSON.parse(apiRequest.response);
		        displayResult(apiResponse);
	        } else {
	        	const nextServerError = window.open('servererror.html', 'errorpage', 'height=400,width=200')
        	    if (window.focus) {
        		    nextServerError.focus()
        	    }
	        }
        };
        apiRequest.onerror = function(){
        	const nextConnectionError = window.open('connectionerror.html', 'errorpage', 'height=400,width=200')
        	if (window.focus) {
        		nextConnectionError.focus()
        	}
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


