const todos = document.getElementById('todos');
const modal = document.getElementById('modal');
const todoInput = document.getElementById('todoInput');
const addTodo = document.getElementById('addTodo');
const hideModal = document.getElementById('hideModal');
const addNewtodo = document.getElementById('addNewtodo');
const markReadTodo = document.getElementById('markReadTodo');

let todoData = [{value: 'value1', id: 1}, {value: 'value2', id: 2}, {value: 'value3', id: 3}, {value: 'value4', id: 4}, {value: 'value5', id: 5}, {value: 'value6', id: 6}, {value: 'value7', id: 7}, {value: 'value81', id: 8}, {value: 'value9', id: 9}];
let todoEditId;

addNewtodo.addEventListener('click', ()=>{
	modal.style.display='block';
})

markReadTodo.addEventListener('click', ()=>{
	todoData = todoData.map(data => { return {...data, marked:true}})
  refreshData(todoData);
})

addTodo.addEventListener('click', (e)=>{
	if(todoEditId){
  	todoData[todoEditId] = {
    	value: todoInput.value,
    	id: todoData[todoEditId].id,
  	};
  }else{
  	todoData.push({
    	value: todoInput.value,
    	id: Date.now(),
  	});
  }

  refreshData(todoData);
  modal.style.display='none';
  todoInput.value = '';
  todoEditId = undefined;
  addTodo.innerHTML = "Add";
})


window.addEventListener('click', (event)=>{
	if(event.target == hideModal){
  	modal.style.display='none';
  }
})

function refreshData(arr){

	const html = arr.map(data => {
  	return `<div class="todoDiv">
    	<input type="checkbox" id="edit_${data.id}" ${data.marked ? 'checked' : ""} onclick="markRead(${data.id})" />
        <span id="todo_${data.id}" class="todoSpan" >${data.value}</span>
        <button id="edit_${data.id}" onClick="editTodo(${data.id})">Edit</button>
        <button id="delete_${data.id}" onClick="deleteTodo(${data.id})">X</button>
      </div>`
  }).join('');

  todos.innerHTML = html;
}

function editTodo(id){
	modal.style.display='block';
  addTodo.innerHTML = "Update";
  todoEditId = todoData.findIndex(data => data.id === id);
  modal.style.display='block';
  todoInput.value = todoData[todoEditId].value;
}

function deleteTodo(id){
	const index = todoData.findIndex(data => data.id === id);
  todoData.splice(index, 1);
  refreshData(todoData);
}

let lastSelectedIndex;
let customSelectedIndex = []
function markRead(id){
	if(event.shiftKey && lastSelectedIndex){
  	customSelectedIndex = {max: Math.max(lastSelectedIndex, id), min: Math.min(lastSelectedIndex, id)}
  }else if(event.shiftKey){
   	lastSelectedIndex = id;
  }
  if(customSelectedIndex){
  	console.log(customSelectedIndex)
  }
	todoEditId = todoData.findIndex(data => data.id === id);
  todoData[todoEditId] = todoData[todoEditId].marked = true;;
  todoInput.value = todoData[todoEditId].value;
}


refreshData(todoData);

