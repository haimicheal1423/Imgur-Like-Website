function setFlashMssgFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

function addFlashfromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash_mssg');
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMssgFadeOut(flashMessageDiv);
}

function createCard(postData) {
    return `<div id = "post-${postData.id}" class = "card">
    <img src="${postData.thumbnail}" alt="Image not Found">
    <h5>
        <p class = "card-title">${postData.title}</p>
        <p class = "card-text">${postData.description}</p>
        <a href="/post/${postData.id}" class = "anchor-buttons">Post Details</a>
    </h5>
</div>`;
}

function executeSearch() {
    let searchTerm = document.getElementById('search').value;
    if (!searchTerm) {
        location.replace('/');
        addFlashfromFrontEnd('empty search term, but here are the 8 recent posts');
        return;
    }
    let mainContent = document.getElementById('home-container');
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
            mainContent.innerHTML = newMainContentHTML;
            if (data_json.message) {
                addFlashfromFrontEnd(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}

let flashElement = document.getElementById('flash_mssg');
if (flashElement) {
    setFlashMssgFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.onclick = executeSearch;
}