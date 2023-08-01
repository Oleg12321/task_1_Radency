const createNode = document.querySelector('#form');
  const tableContent = document.querySelector('#table_list_content');
  const nameNode = document.querySelector('#nameNode');
  const contentText = document.querySelector('#content_text');
  const selectElements = document.querySelector('#category');
  const thIcon = document.querySelector('.table_body_icon_category')
  const editModal = new bootstrap.Modal(document.querySelector('#editModal'))
  const editForm = document.querySelector('#editForm')
  let time = new Date();
  let listNode = [];

  let icons = {
        task: `<i class="fa-solid fa-cart-shopping"></i>`,
        'random thought': `<i class="fa-solid fa-shuffle"></i>`,
        idea: `<i class="fa-regular fa-lightbulb"></i>`,
      }

  let editTaskId = null


  tableContent.addEventListener('click', deleteTask)

  function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return
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

tableContent.addEventListener('click', (e) => {
  e.preventDefault()
  const { edit } = e.target.dataset;
  if (edit) {
    const task = listNode.find((task) => task.id === edit);

    editForm.elements.nameNode.value = task.nameNode;
    editForm.elements.category.value = task.category;
    editForm.elements.contentText.value = task.contentText;

  }
});



createNode.addEventListener('submit', (event) => {
    

    const nameNode = event.target.elements.nameNode.value;
    const category = event.target.elements.category.value;
    const contentText = event.target.elements.contentText.value

  renderTask(nameNode, category, contentText);
  });

  function renderTask(nameNode, category, contentText) {
  const newTask = {
    id: Date.now().toString(),
    nameNode,
    category,
    date: time.toDateString(),
    contentText,
    isDisable: true
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
            <p class="dates"></p>
          </th>
          <th class="table_body_edit" scope="col"><i data-edit="${newTask.id}" class="fa-solid fa-pen table_body_edit"></i></th>
          <th class="table_body_archive" scope="col"><i class="fa-solid fa-box-archive table_body_archive" style="color: #000000;"></i></th>
          <th class="table_body_trash" scope="col"><button type="submit" data-action="delete" id="button_trash"><i class="fa-solid fa-trash" data-action="delete"></i></button></th>
        </tr>
  `;

  tableContent.append(newItem);
}
 
  // function listfresher() {
  //   tableContent.innerHTML = '';
  //   renderTask();
  // }

  // function renderTask() {
  //   for (const td of listNode) {

  //     const taskHTML = `
  //       <tr id="${td.id}" class="table_body_row">
  //         <th class="table_body_icon_category icon_element" scope="row">${icons[td.category]}</th>
  //         <th class="table_body_name" scope="col">${td.nameNode}</th>
  //         <th class="table_body_create" scope="col">${td.date}</th>
  //         <th class="table_body_category" scope="col">

  //             ${td.category}
  
  //         </th>
  //         <th class="table_body_content" scope="col">${td.contentText}</th>
  //         <th class="table_body_dates" scope="col">
  //           <p class="dates"></p>
  //         </th>
  //         <th class="table_body_edit" scope="col"><i data-edit="${td.id}" class="fa-solid fa-pen table_body_edit"></i></th>
  //         <th class="table_body_archive" scope="col"><i class="fa-solid fa-box-archive table_body_archive" style="color: #000000;"></i></th>
  //         <th class="table_body_trash" scope="col"><button data-action="delete" id="button_trash"><i class="fa-solid fa-trash" data-action="delete"></i></button></th>
  //       </tr>
  //     `;
  //     tableContent.insertAdjacentHTML('beforeend', taskHTML);
  //   }
  // }

  


  
   