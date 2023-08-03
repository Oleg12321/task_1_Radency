const createNode = document.querySelector('#form');
  const tableContent = document.querySelector('#table_list_content');
  const staticBackdrop = new bootstrap.Modal(document.querySelector('#staticBackdrop'))
  const editModal = new bootstrap.Modal(document.querySelector('#editModal'))
  const editForm = document.querySelector('#editForm')
  const numberBody = document.querySelector('.table_body_numbers')
  const footArchived = document.querySelector('#table_list_archived')
  const btnArchived = document.querySelector('.button_header_archived')
  const btnCreateNode = document.querySelector('#btn_create_node')
  



  let time = new Date();
  let listNode = [];
  let listArchived = []

  let icons = {
        task: `<i class="fa-solid fa-cart-shopping"></i>`,
        'random thought': `<i class="fa-solid fa-shuffle"></i>`,
        idea: `<i class="fa-regular fa-lightbulb"></i>`,
      }
// content

  let editTaskId = null


  tableContent.addEventListener('click', deleteTask)

  function deleteTask(event) {
    if (event.target.dataset.action !== 'delete'
    ) return
    const parenNode = event.target.closest('.table_body_row')
    const id = +(parenNode.id)
    listNode = listNode.filter( task => task.id !== id)
    parenNode.remove()
}


  window.addEventListener("click", (e) => {
  const { edit } = e.target.dataset;
  if (edit) {
    editModal.show()
    editTaskId = edit
  }
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault()
    
  const editNameNode = event.target.elements.nameNode.value;
  const editCategory = event.target.elements.category.value;
  const editContentText = event.target.elements.contentText.value
    
  document.querySelector(`#task_${editTaskId} .table_body_name`).textContent = editNameNode
  document.querySelector(`#task_${editTaskId} .table_body_category`).textContent = editCategory
  document.querySelector(`#task_${editTaskId} .table_body_content`).textContent = editContentText
  document.querySelector(`#task_${editTaskId} .dates`).textContent = editContentText.match(/\d{2}([\/.-])\d{2}\1\d{4}/g) || ''

  editModal.hide()
  editTaskId = null
})

tableContent.addEventListener('click', (e) => {
  
  const { edit } = e.target.dataset;
  if (edit) {
    const task = listNode.find((task) => task.id === edit);   
    editForm.elements.nameNode.value = task.nameNode;
    editForm.elements.category.value = task.category;
    editForm.elements.contentText.value = task.contentText;

    
  }
});



createNode.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameNode = event.target.elements.nameNode.value;
    const category = event.target.elements.category.value;
    const contentText = event.target.elements.contentText.value
    
  renderTask(nameNode, category, contentText)
  staticBackdrop.hide()
});

  function renderTask(nameNode, category, contentText) {
  const newTask = {
    id: Date.now().toString(),
    nameNode,
    category,
    date: time.toDateString(),
    contentText,
    datesFromText: contentText.match(/\d{2}([\/.-])\d{2}\1\d{4}/g) || '',
    isDisable: true,
    isArchived: false
  };
  listNode.push(newTask);
  
  const newItem = document.createElement('tr');
  newItem.classList.add('table_body_row')
  newItem.id = `task_${newTask.id}`;

  newItem.innerHTML = `
    <th class="table_body_icon_category icon_element" scope="row">${icons[newTask.category]}</th>
          <th class="table_body_name" scope="col">${newTask.nameNode}</th>
          <th class="table_body_create" scope="col">${newTask.date}</th>
          <th class="table_body_category" scope="col">
              ${newTask.category}
          </th>
          <th class="table_body_content" scope="col">${newTask.contentText}</th>
          <th class="table_body_dates" scope="col">
            <p class="dates">${newTask.datesFromText}</p>
          </th>
          <th class="table_body_edit" scope="col"><i data-edit="${newTask.id}" class="fa-solid fa-pen table_body_edit"></i></th>
          <th class="table_body_archive" scope="col"><button type="submit" data-archived="${newTask.id}" data-action="archived" id="button_archived"><i class="fa-solid fa-box-archive table_body_archive" style="color: #000000;"></i></button></th>
          <th class="table_body_trash" scope="col"><button type="submit" data-action="delete" id="button_trash"><i class="fa-solid fa-trash" data-action="delete"></i></button></th>
        </tr>
  `;

  tableContent.append(newItem);
}


//  archived
function archivedTask() {

  
  for (const key in listArchived) {
    
      const i = listArchived[key];
      i.forEach((td) => {
        const newItem = document.createElement('tr');
      newItem.classList.add('table_body_row')
      newItem.id = `task_${td.id}`;
      newItem.innerHTML = `
        <th class="table_body_icon_category icon_element" scope="row">${icons[td.category]}</th>
              <th class="table_body_name" scope="col">${td.nameNode}</th>
              <th class="table_body_create" scope="col">${td.date}</th>
              <th class="table_body_category" scope="col">
                  ${td.category}
              </th>
              <th class="table_body_content" scope="col">${td.contentText}</th>
              <th class="table_body_dates" scope="col">
                <p class="dates">${td.datesFromText}</p>
              </th>
              <th class="table_body_edit" scope="col"><i data-edit="${td.id}" class="fa-solid fa-pen table_body_edit"></i></th>
              <th class="table_body_archive" scope="col"><button type="submit" data-archived="${td.id}" id="button_archived"><i class="fa-solid fa-box-archive table_body_archive" style="color: #000000;"></i></button></th>
              
            </tr>
        `;

      footArchived.append(newItem);
      })
      
  } 
}
    
    
  


btnArchived.addEventListener('click', () => {
  tableContent.classList.toggle('active')
  footArchived.classList.toggle('active')
  btnCreateNode.classList.toggle('active')
})


  tableContent.addEventListener('click', (e) => {
    e.preventDefault()
    const { archived } = e.target.dataset;
    if (archived) {
      const parenNode = e.target.closest('.table_body_row')
      let task = listNode.find((task) => task.id === archived);
      console.log(task);
      let taskNum = listNode.splice(task, 1);
      listArchived.push(taskNum)
      listNode = listNode.filter( task => !task.isArchived)
      parenNode.remove()
      archivedTask()
      listfresher()
    }
  });

  function listfresher() {
    footArchived.innerHTML= ``
    archivedTask()
  }
 
  footArchived.addEventListener('click', (e) => {
    e.preventDefault()
    const { archived } = e.target.dataset;
    if (archived) {
      const parenNode = e.target.closest('.table_body_row')
      let task = listArchived.find((task) => task.id === archived);
      console.log(task);
      let taskNum = listArchived.splice(task, 1);
      listNode.push(taskNum)
      listArchived = listArchived.filter( task => task.isArchived)
      parenNode.remove()
      renderTask()
      listfresher()
    }
  });






//  number of nodes 
  let listOfNumbers = [{
      id: Date.now().toString(),
      categoryImg: icons.task,
      category: 'Task',
      active: listNode.length,
      archived: 2
    },
    {
      id: Date.now().toString(),
      categoryImg: icons['random thought'],
      category: 'Random Thought',
      active: listNode.length,
      archived: 2
    },
    {
      id: Date.now().toString(),
      categoryImg: icons.idea,
      category: 'Idea',
      active: listNode.length,
      archived: 2
    }
  ]


  function renderNumbers() {
  for (const td of listOfNumbers) {
    const newItem = document.createElement('tr');
  newItem.classList.add('table_body_row_number')
  newItem.id = `task_${td.id}`;
  newItem.innerHTML = `
    <th class="table_body_icon_category icon_element" scope="row">${td.categoryImg}</th>
          <th class="table_body_category" scope="col">${td.category}</th>
          <th class="table_body_content" scope="col">${td.active}</th>
          <th class="table_body_dates" scope="col">
            <p class="dates">${td.archived}</p>
          </th>
    </tr>
  `;

  numberBody.append(newItem);
  }
  
}

renderNumbers()


  
   