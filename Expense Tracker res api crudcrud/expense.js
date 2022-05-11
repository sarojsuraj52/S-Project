//saving to crudcrud and calling displayOnFrontend function
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
        //deleting duplicate if found
        async function findDuplicate(){
            const res = await axios.get('https://crudcrud.com/api/d3a2ce96b61c46f1831588ec356d7468/expenseData')
            res.data.forEach(data => {
                if(data.category === category){
                   deleteDuplicate(data._id)
                }
            })

        }
        findDuplicate()
        //saving to crudcrud
        async function postData(){
            try{
                const res = await axios.post('https://crudcrud.com/api/d3a2ce96b61c46f1831588ec356d7468/expenseData',myObj)
                displayOnFrontend(res.data)
            }
            catch(err){
                console.log('Posting error ->',err)
            }
        }
        postData()
    }
}

//retrieving data from crudcrud and displaying in frontend when dom is loaded
document.addEventListener('DOMContentLoaded', (e)=>{

    async function getData(){
        try{
            const res = await  axios.get('https://crudcrud.com/api/d3a2ce96b61c46f1831588ec356d7468/expenseData')
            res.data.forEach(data => {
                displayOnFrontend(data)
            })
        }
        catch(err){
            console.log('Getting error ->',err)
        }
    }
    getData()
   
    
})


//displaying in the frontend
function displayOnFrontend(object){
    const ul = document.getElementById('listOfExpense')
    const li = document.createElement('li')
    li.id = object._id
    li.appendChild(document.createTextNode(object.amount + " " + object.description + " " + object.category + " "))
    let br = document.createElement('br');
    ul.appendChild(br)
    ul.appendChild(li)
    editBtn(object)
    deleteBtn(object)
}


//edit button
function editBtn(object){
    const li = document.getElementById(object._id);
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
    const li = document.getElementById(object._id);
    const deletebtn = document.createElement('input');
    deletebtn.value = 'Delete'
    deletebtn.type = 'button'
    li.appendChild(deletebtn)
    deletebtn.addEventListener('click', async ()=>{
        try{
            const res = await  axios.delete(`https://crudcrud.com/api/d3a2ce96b61c46f1831588ec356d7468/expenseData/${object._id}`)
            if(res.status == 200){
                li.remove()
            }
        }
        catch(err){
            console.log(err)
        }
    })
}

async function deleteDuplicate(id){
    const li = document.getElementById(id)
    if(li){
        li.remove()
    }
}




