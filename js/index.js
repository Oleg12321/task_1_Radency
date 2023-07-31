// let createNode = document.querySelector('#create_node') 
// let category = document.querySelector('#category')
// let edit = document.querySelector(".table_body_edit")
// let content = document.querySelectorAll("input")
// let tableContent = document.querySelector('#table_list_content')
// let form = document.querySelector("#from")
// let nameNode = document.querySelector('#nameNode')
// let contentText = document.querySelector('#content_text')




// // let categoryNodes = {
// //   task: `<i class="fa-solid fa-cart-shopping"></i>`
// // }

// // console.log(Object.keys(categoryNodes).join(''));

// // category.addEventListener('change', (e) => {
// //   let taskNode = e.target.value
// //   if (Object.keys(categoryNodes).join('') === taskNode.toLowerCase()) {
// //     console.log('dfdfd');
// //   }
// // })
// let time = new Date

// let listNode = []

// // if (form) {
// //   form.addEventListener('submit', addTask)
// // }







// // function addTask(event) {
// //     //  cancel the shipment form
// //     event.preventDefault()

// //     // get the text from input
// //     const taskText = nameNode.value

// //     // describe the task
// //     const newTask = {
// //         id: Date.now(),
// //         icons: {
// //           task: `<i class="fa-solid fa-cart-shopping"></i>`,
// //           'random thought': `<i class="fa-regular fa-lightbulb"></i>`,
// //           idea: `<i class="fa-solid fa-shuffle"></i>`
// //         },
// //         nameNode: nameText,
// //         date: time.toDateString(),
// //         text: taskText,
// //         done: false
// //     }

// //     // add tasks in array
// //     listNode.push(newTask)

// //     // save list tasks in LocalStorage
// //     // saveToLocalStorage()

// //     renderTask(newTask)

// //     // clear input
// //     nameNode.value = ''
// //     nameNode.focus()

// //     // checkEmptyList()
// // }

// // function setDisable (i) {
// //   let disable = document.querySelectorAll(".isDisable")
// //   console.log(disable);
  
// //   for(let input of disable) {
// //     console.log(input[i]);
// //     if (i === i) {
// //       input[i].disabled = !input.isDisable 
// //     }
      
// //   }
// //   // isDisable.disabled = category.disabled ? false : true;
// // }
// function setDisable(inputId) {
//   const input = document.getElementById(inputId);
//   input.disabled = !input.disabled;
// }

// const editButtons = document.querySelectorAll('.table_body_edit');

// // Перебираємо кожну кнопку і додаємо обробник події для кожної з них
// editButtons.forEach(function(button) {
//   button.addEventListener('click', function() {
//     // Отримуємо ID input, знаходячись поруч з кнопкою
//     const inputId = this.closest('.table_body_row').id;

//     // Викликаємо функцію для зміни стану input
//     setDisable(inputId);
//   });
// });


// // function deleteNode(e) {
// //   if (e.target.dataset.action !== 'delete') return

// //     const parenNode = e.target.closest('.ltable_body_row')

// //     const id = +(parenNode.id)

// //     // delete tasks from array
// //     tasks = tasks.filter( task => task.id !== id)
// // }


// // const hideModal = () => {

// // }

// // const complete = () =>{
// //   listfresher()
// // }


// const listfresher = () => {
//   tableContent.innerHTML = ''
//   renderTask()
// }

// function renderTask() {
//     // formation css class
//     // markup for a new task
//     for (const i in listNode) {

//       let td = listNode[i]
//       console.log(td);
//       taskHTML = `
//         <tr id="${td.id}" class="table_body_row">
//             <th class="table_body_icon_category" scope="row"><i class="fa-solid fa-cart-shopping"></i></th>
//             <th class="table_body_name" scope="col"><input type="text" class="isDisable" value="${td.nameNode}"></th>
//             <th class="table_body_create" scope="col">${td.date}</th>
//             <th class="table_body_category" scope="col">
//               <form action="">
//                 <select name="category" id="category" class="isDisable">
//                   <option value="Task">Task</option>
//                   <option value="Random Thought">Random Thought</option>
//                   <option value="Idea">Idea</option>
//                 </select>
//               </form>
//             </th>
//             <th class="table_body_content" scope="col"><input class="content_text isDisable" type="text" value="${td.contentText}"></th>
//             <th class="table_body_dates" scope="col">
//               <p class="dates"></p>
//             </th>
//             <th class="table_body_edit" scope="col"><i class="fa-solid fa-pen table_body_edit" onClick="setDisable('${td.id}')"></i></th>
//             <th class="table_body_archive" scope="col"><i class="fa-solid fa-box-archive table_body_archive" style="color: #000000;"></i></th>
//             <th class="table_body_trash" scope="col"><i class="fa-solid fa-trash table_body_trash" data-action="delete"></i></th>
//           </tr>
//     `
   
//     // add it to the screen
//     tableContent.insertAdjacentHTML('beforeend', taskHTML)
//     }
// }
// createNode.addEventListener('click', () => {
//   event.preventDefault()

//   const newTask = {
//         id: Date.now(),
//         icons: {
//           task: `<i class="fa-solid fa-cart-shopping"></i>`,
//           'random thought': `<i class="fa-regular fa-lightbulb"></i>`,
//           idea: `<i class="fa-solid fa-shuffle"></i>`
//         },
//         nameNode: nameNode.value,
//         date: time.toDateString(),
//         contentText: contentText.value,
//         isDisable: true
//     }

//   listNode.push(newTask)
//   listfresher()
// })

// function addTask() {
//   renderTask()
// }

// addTask()

const createNode = document.querySelector('#create_node');
  const tableContent = document.querySelector('#table_list_content');
  const nameNode = document.querySelector('#nameNode');
  const contentText = document.querySelector('#content_text');
  // const deleteButton = document.querySelector('#button_trash')
  const time = new Date();
  const listNode = [];

  // function setDisable(inputId) {
  //   const input = document.getElementById(inputId);
  //   input.disabled = !input.disabled;
  // }
  // window.addEventListener("DOMContentLoaded", () => {
  //   if (deleteButton) {
  //   deleteButton.addEventListener('click', () => {
  //   let newId = listNode.filter(elm => {
  //     return !elm.isComplete
  //   })
  //   console.log(newId);
  // })
  // }
    // 
  // console.log(deleteButton);
  // })

  function deleteButton() {
    let newId = listNode.filter(elm => {
      return !elm.isComplete
    })
    console.log(newId);
  }

 

  window.addEventListener("click", (e) => {
  const { disabletarget } = e.target.dataset;
  if (disabletarget) {
    const targetInput = document.querySelectorAll(`.c${disabletarget}`);
    targetInput.disabled = !targetInput.disabled;
  }
});
  function listfresher() {
    tableContent.innerHTML = '';
    renderTask();
  }

  function renderTask() {
    for (const i in listNode) {
      const td = listNode[i];
      const taskHTML = `
        <tr id="${td.id}" class="table_body_row">
          <th class="table_body_icon_category" scope="row"><i class="fa-solid fa-cart-shopping"></i></th>
          <th class="table_body_name" scope="col"><input type="text" class="isDisable ${'c' + td.id}" value="${td.nameNode}"></th>
          <th class="table_body_create" scope="col">${td.date}</th>
          <th class="table_body_category" scope="col">
            <form action="">
              <select class="${'c' + td.id}"  name="category" class="category isDisable">
                <option value="Task">Task</option>
                <option value="Random Thought">Random Thought</option>
                <option value="Idea">Idea</option>
              </select>
            </form>
          </th>
          <th class="table_body_content" scope="col"><input class="content_text isDisable ${'c' + td.id}" type="text" value="${td.contentText}"></th>
          <th class="table_body_dates" scope="col">
            <p class="dates"></p>
          </th>
          <th class="table_body_edit" scope="col"><i data-disabletarget="${td.id}" class="fa-solid fa-pen table_body_edit"></i></th>
          <th class="table_body_archive" scope="col"><i class="fa-solid fa-box-archive table_body_archive" style="color: #000000;"></i></th>
          <th class="table_body_trash" scope="col"><button id="button_trash" onClick="deleteButton()"><i class="fa-solid fa-trash" data-action="delete"></i></button></th>
        </tr>
      `;
      tableContent.insertAdjacentHTML('beforeend', taskHTML);
    }
  }

  createNode.addEventListener('click', (event) => {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      icons: {
        task: `<i class="fa-solid fa-cart-shopping"></i>`,
        'random thought': `<i class="fa-regular fa-lightbulb"></i>`,
        idea: `<i class="fa-solid fa-shuffle"></i>`,
      },
      nameNode: nameNode.value,
      date: time.toDateString(),
      contentText: contentText.value,
      isDisable: true,
      isComplete: false
    };

    listNode.push(newTask);
    listfresher();
  });
  
   