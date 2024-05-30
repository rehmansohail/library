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



//handling the form
const bookForm = document.getElementById('form1')
bookForm.addEventListener('submit',()=>{
    event.preventDefault()
    
    let title = document.getElementById('inputTitle').value
    let author = document.getElementById('inputAuthor').value
    let pages = document.getElementById('inputPages').value
    let read = document.getElementById('gridCheck').checked ? "yes" : "no"
    // console.log(title)
    // console.log(author)
    // console.log(pages)
    // console.log(read)
    createTaskCard(title,author,pages,read)


    bookForm.reset()
})

//code to remove cards 

const bookContainer = document.getElementById('cardContainer')

bookContainer.addEventListener('click',(e)=>{
    
    if(e.target.classList.contains('btn')){
        
        if(e.target.textContent =="Delete"){
        const card = e.target.closest('.col');
        if (card) {
        bookContainer.removeChild(card);
      }
    }
    if(e.target.textContent =="Read"){
       const btns = e.target.closest("#buttons")
       const oldbtn = e.target.closest('.read')
       let newbtn = document.createElement('a')
        newbtn.href="#/"
        newbtn.classList.add('btn', 'btn-success','read')
        newbtn.innerText = "Not Read"
        btns.removeChild(oldbtn)
        btns.appendChild(newbtn)
    }
    if(e.target.textContent=="Not Read"){
        const btns = e.target.closest("#buttons")
       const oldbtn = e.target.closest('.read')
       let newbtn = document.createElement('a')
        newbtn.href="#/"
        newbtn.classList.add('btn', 'btn-danger','read')
        newbtn.innerText = "Read"
        btns.removeChild(oldbtn)
        btns.appendChild(newbtn)
    }
}   
})

//prevent default anchor tag behaviour
document.addEventListener('click',(e)=>{
    if(e.target.tagName =='a'){
        e.preventDefault();
    }
})