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
    let btn1 = document.createElement('a')
    btn1.href="#"
    btn1.classList.add('btn', 'btn-danger')
    btn1.innerText = "Delete"

    let btn2 = document.createElement('a')
    btn2.href="#"
    btn2.classList.add('btn')
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