const refs = {
  tasksList: document.querySelector('#tasksList'),
  title: document.querySelector('#title'),
  modals: {
    create: new bootstrap.Modal(document.querySelector('#staticBackdrop')),
    edit: new bootstrap.Modal(document.querySelector('#editTaskModal')),
    remove: document.querySelector('#removeTaskModal'),
  },
  forms: {
    create: document.querySelector('#createTaskForm'),
    edit: document.querySelector('#editTaskForm'),
    remove: document.querySelector('#removeTaskForm'),
  },
};

let time = new Date();

let tasksData = [];

let idCounter = 0;
const getNewId = () => (++idCounter).toString();

 let icons = {
        task: `<i class="fa-solid fa-cart-shopping"></i>`,
        'random thought': `<i class="fa-solid fa-shuffle"></i>`,
        idea: `<i class="fa-regular fa-lightbulb"></i>`,
      }

let activeModalRef = null;
let taskToEdit = null;
let taskToRemove = null;
let isArchiveOpen = false;

function createTaskHTML(task) {
  const taskClasses = [];
  if (task.isArchived) {
    taskClasses.push('is-archived');
  }


  return `
      <tr id="task_${task.id}" class="table_body_row ${taskClasses.join(' ')}">
        <th class="table_body_icon_category icon_element" scope="row">${icons[task.category]}</th>
          <th class="table_body_name" scope="col">${task.nameNode}</th>
          <th class="table_body_create" scope="col">${task.date}</th>
          <th class="table_body_category" scope="col">
              ${task.category}
          </th>
          <th class="table_body_content" scope="col">${task.contentText}</th>
          <th class="table_body_dates" scope="col">
            <p class="dates">${task.datesFromText}</p>
          </th>
          <th class="table_body_edit" scope="col">
            <i data-editid="${task.id}" class="fa-solid fa-pen table_body_edit"></i>
          </th>
          <th class="table_body_archive" scope="col">
            <button type="submit" data-archiveid="${task.id}">
              <i class="fa-solid fa-box-archive data-archiveid="${task.id}" style="color: #000000;"></i>
            </button>
          </th>
          <th class="table_body_trash" scope="col">
            <button type="submit" data-removeid="delete" id="button_trash">
              <i class="fa-solid fa-trash" data-removeid="delete"></i>
            </button>
          </th>
      </tr>       
  `;
}

function getTaskRefById(id) {
  return document.querySelector(`#task_${id}`);
}

function createTask(nameNode, contentText, category) {
  const newTask = {
    id: getNewId(),
    nameNode,
    date: time.toDateString(),
    category,
    contentText,
    datesFromText: contentText.match(/\d{2}([\/.-])\d{2}\1\d{4}/g) || '',
    isArchived: false,
  };
  tasksData.push(newTask);
  console.log(tasksData);
  // Don't render new task if archive is open
  if (!isArchiveOpen) {
    refs.tasksList.insertAdjacentHTML('beforeend', createTaskHTML(newTask));
  }

  refs.modals.create.hide()
}

refs.forms.create.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameNode = e.target.elements.nameNode.value;
  const category = e.target.elements.category.value;
  const contentText = e.target.elements.contentText.value;
  

  createTask(nameNode, contentText, category);
  e.target.elements.nameNode.value = ''
  e.target.elements.category.value = 'task'
  e.target.elements.contentText.value = '' 
});


refs.tasksList.addEventListener('click', (event) => {
  
  if (event.target.dataset.removeid !== 'delete'
    ) return
  
  const parenNode = event.target.closest('.table_body_row')
  const id = (parenNode.id)

  
  tasksData = tasksData.filter( (task) => `task_${task.id}` !== id)
  parenNode.remove()
})


function deleteTask(event) {
    if (event.target.dataset.removeid !== 'delete'
    ) return
    const parenNode = event.target.closest('.table_body_row')
    const id = +(parenNode.id)
    listNode = listNode.filter( task => `task_${task.id}` !== id)
    parenNode.remove()
}

function renderTasks() {
  refs.tasksList.innerHTML = '';
  tasksData.forEach((task) => {
    if (task.isArchived === isArchiveOpen) {
      refs.tasksList.insertAdjacentHTML('beforeend', createTaskHTML(task));
    }
  });
}

window.addEventListener('click', (e) => {
  // Close modal on cross btn or modal background click
  if (
    e.target.classList.contains('modal-close') ||
    e.target.classList.contains('modal-background') ||
    e.target.classList.contains('modal-close-btn')
  ) {
    closeModal();
  }

  const { editid, archiveid } = e.target.dataset;
  // Populate edit form and open edit modal
  if (editid) {
    const task = tasksData.find((task) => task.id === editid);

    refs.forms.edit.elements.nameNode.value = task.nameNode;
    refs.forms.edit.elements.category.value = task.category;
    refs.forms.edit.elements.contentText.value = task.contentText;

    taskToEdit = task;

    refs.modals.edit.show()
  }

  if (archiveid) {
    const task = tasksData.find((task) => task.id === archiveid);
console.log(task);
    task.isArchived = !task.isArchived;
    const taskRef = getTaskRefById(task.id);
    console.log(taskRef);
    taskRef.remove();
  }

  // Toggle archive display
  if (e.target.id === 'toggleArchive') {
    isArchiveOpen = !isArchiveOpen;
    e.target.textContent = isArchiveOpen ? '' : ''
    renderTasks();
  }

})

refs.forms.edit.addEventListener('submit', e => {
  e.preventDefault()

  const editNameNode = e.target.elements.nameNode.value;
  const editCategory = e.target.elements.category.value;
  const editContentText = e.target.elements.contentText.value;
  const datesFromText = editContentText.match(/\d{2}([\/.-])\d{2}\1\d{4}/g) || '';

  updateTask(editNameNode, editCategory, editContentText, datesFromText);
  e.target.elements.nameNode.value = ''
  e.target.elements.category.value = 'task'
  e.target.elements.contentText.value = '' 
})

function updateTask(nameNode, category, contentText, datesFromText) {
  // Update task object
  taskToEdit.nameNode = nameNode;
  taskToEdit.category = category;
  taskToEdit.contentText = contentText;

  // Find task card
  const taskRef = getTaskRefById(taskToEdit.id);

  // Update card html
  taskRef.querySelector('.icon_element').innerHTML = icons[category];
  taskRef.querySelector('.table_body_name').textContent = nameNode;
  taskRef.querySelector('.table_body_category').category = category;
  taskRef.querySelector('.table_body_content').textContent = contentText;
  taskRef.querySelector('.dates').textContent = datesFromText;

  // Reset variable and close modal
  taskToEdit = null;
  refs.modals.edit.hide()
}

