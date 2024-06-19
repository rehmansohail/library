const cardContainer = document.getElementById('cardContainer')

let createTaskCard = (title,author,pages,read) => {

    let card = document.createElement('div');
    card.className = 'col';

    let card_style = document.createElement('div');
    card_style.classList.add('card','text-light','bg-dark','mb-3')
    card_style.style.cssText = "max-width: 18rem;"

    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardHeader.innerHTML = `<h4>${title}</h4>`

    let cardBodyHeading = document.createElement('h5')
    cardBodyHeading.classList.add('card-title')
    cardBodyHeading.innerText = author

    let cardBodyPages = document.createElement('p')
    cardBodyPages.classList.add('card-text')
    cardBodyPages.innerText = `${pages} pages`

    cardBody.appendChild(cardBodyHeading)
    cardBody.appendChild(cardBodyPages)
    let cardBodyFooter = document.createElement('div')
    cardBodyFooter.id = "buttons"
    let btn1 = document.createElement('a')
    btn1.href="#/"
    btn1.style.cssText="margin-right: 2px;"
    btn1.classList.add('btn', 'btn-danger')
    btn1.innerText = "Delete"

    let btn2 = document.createElement('a')
    btn2.href="#/"
    btn2.classList.add('btn')
    btn2.classList.add('read')
    if(read=='yes'){
        btn2.innerText="Read"
        btn2.classList.add('btn-danger')
    }else{
        btn2.innerText="Not Read"
        btn2.classList.add('btn-success')
    }
    cardBodyFooter.appendChild(btn1)
    cardBodyFooter.appendChild(btn2)
    cardBody.appendChild(cardBodyFooter)
    card_style.appendChild(cardHeader)
    card_style.appendChild(cardBody)
    card.appendChild(card_style)
    cardContainer.appendChild(card)
    

}


$(document).ready(function() {
    var searchInput = $("#searchInput");
    var dropdownList = $("#dropdownList");
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Function to handle the debounced input event
    const handleDebouncedInput = async function () {
        const searchTerm = searchInput.val().trim();
        console.log("Search Term: ", searchTerm);

        try {
            const searchData = await fetchData(searchTerm);
            console.log("Searched Books: ", searchData);
            // Update the dropdown list
            await updateDropdown(searchData, dropdownList);
        } catch (error) {
            console.error('Error updating dropdown:', error);
        }
    };

    searchInput.on('input', debounce(handleDebouncedInput,500));



});

async function fetchData(searchTerm) {
    try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}&fields=title,author_name,first_publish_year,cover_i&limit=8`);
        const docs = response.data.docs;

        const searchData = docs.map(doc => {
            const title = doc.title ? doc.title : "N/A";
            const publishYear = doc.first_publish_year ? doc.first_publish_year : "N/A";
            const coverId = doc.cover_i ? doc.cover_i : "N/A";
            const authorName = doc.author_name ? doc.author_name[0] : "N/A";

            return {
                title: title,
                publishYear: publishYear,
                coverId: coverId,
                authorName: authorName,
            };
        });

        console.log(searchData);
        return searchData;
    } catch (error) {
        console.error("Error fetching data: ", error);
        // Return an empty array or handle the error as needed
        return [];
    }
}

async function updateDropdown(items, dropdownList) {
    const html = items.map(item =>
        `<a href="/book?title=${item.title}&author=${item.authorName}&coverId=${item.coverId ? item.coverId : 0}">
            <li class="listItem">
                <div class="d-flex align-items-center">
                    <img class="align-self-center" src="https://covers.openlibrary.org/b/id/${item.coverId}-S.jpg?default=https://openlibrary.org/static/images/icons/avatar_book-sm.png" width="40" height="60" alt="book picture">
                    <div class="d-block">
                        <p><strong>${item.title}</strong></p>
                        <p>By ${item.authorName}, ${item.publishYear}</p>
                    </div>
                </div>
            </li>
        </a>`
    ).join('');
    dropdownList.html(html);

    // Show/hide dropdown
    if (items.length > 0) {
        dropdownList.show();
    } else {
        dropdownList.hide();
    }
}


//prevent default anchor tag behaviour
document.addEventListener('click',(e)=>{
    if(e.target.tagName =='a'){
        e.preventDefault();
    }
})