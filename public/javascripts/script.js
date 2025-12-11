let nameList = [];
const list = document.getElementById('list');
const addItemButton = document.getElementById('add-item-button');
let inputvalue = document.getElementById('text').value;

addItemButton.addEventListener('click', function () {
    let inputvalue = document.getElementById('text').value;
    addItem(inputvalue);
    document.getElementById('text').value = "";
});

async function getItems() {
    const response = await fetch('/api/names');
    const data = await response.json();
    console.log(data);
    nameList = data;
    updateList();
    document.getElementById('text').value = "";
}

getItems();

function updateList() {
    document.getElementById("list").innerHTML = ''
    for (let i = 0; i < nameList.length; i++) {
        const liElement = document.createElement('li');
        liElement.innerText = nameList[i].name;
        liElement.id = nameList[i]._id;

        if (nameList[i].isHighlighted) {
            liElement.classList.add('highlighted');
        } else {
            liElement.classList.add('notHighlighted');
        }

        liElement.addEventListener('click', function() {
            if (liElement.classList.contains('highlighted')) {
                updateName(nameList[i]._id,
                {isHighlighted: false}
            );
            } else {
                updateName(nameList[i]._id,
                {isHighlighted: true}
            );
            }    
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        deleteButton.addEventListener('click', function(e) {
            console.log('delete');
            deleteName(nameList[i]._id);
        })
        liElement.appendChild(deleteButton);

        list.appendChild(liElement);
    }
}

async function addItem(value) {
    const postData = {
        name: value,
        isHighlighted: false
    }
    const response = await fetch('/api/names', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    nameList = data;
    getItems()
}

async function updateName(id, updatedName){
    const response = await fetch('/api/names/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedName),
    })
    const data = await response.json();
    nameList = data;
    getItems();
}

async function deleteName(id) {
    const response = await fetch('/api/names/' + id, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    nameList = data;
    getItems();
}