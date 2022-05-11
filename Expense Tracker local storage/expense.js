
//saving to localstorge and calling displayOnFrontend function
document.querySelector('form').onsubmit = (e) =>{
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    if(amount.length > 0 || description.length > 0 || category.length > 0){
        const myObj = {
            amount:amount,
            description:description,
            category:category
        }
        //edge case handling for duplicate with same category deletion
        if(localStorage.getItem('ExpenseData' + category)){
            deleteCopy(category)
        }
        //saving to localstorage
        localStorage.setItem('ExpenseData' + category, JSON.stringify(myObj))
        displayOnFrontend(myObj)
    }
    
}

//retrieving data from local storage and displaying in frontend when dom is loaded
document.addEventListener('DOMContentLoaded', (e)=>{
    Object.keys(localStorage).forEach((key)=>{
        let stringifiedListOfExpense = localStorage.getItem(key);
        let ListOfExpenses = JSON.parse(stringifiedListOfExpense)
        displayOnFrontend(ListOfExpenses);
    })
})


//displaying in the frontend
function displayOnFrontend(object){
    const ul = document.getElementById('listOfExpense')
    const li = document.createElement('li')
    li.id = object.category
    li.appendChild(document.createTextNode(object.amount + " " + object.description + " " + object.category + " "))
    let br = document.createElement('br');
    ul.appendChild(br)
    ul.appendChild(li)
    editBtn(object)
    deleteBtn(object)
}


//edit button
function editBtn(object){
    const li = document.getElementById(object.category);
    const edit = document.createElement('input');
    edit.value = 'Edit'
    edit.type = 'button'
    li.appendChild(edit)
    edit.addEventListener('click',()=>{
        document.getElementById('amount').value = object.amount;
        document.getElementById('description').value = object.description;
        document.getElementById('category').value = object.category;
        li.remove()
    })
}

//delete button
function deleteBtn(object){
    const li = document.getElementById(object.category);
    const deletebtn = document.createElement('input');
    deletebtn.value = 'Delete'
    deletebtn.type = 'button'
    li.appendChild(deletebtn)
    deletebtn.addEventListener('click', ()=>{
        localStorage.removeItem('ExpenseData' + object.category)
        li.remove()
    })
}

//if duplicate found with same category replace
function deleteCopy(category){
    const li = document.getElementById(category)
    if(li){//if li exist 
        li.remove()//then delete
    }
}
