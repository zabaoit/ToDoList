const btn = document.getElementById("add-btn");
const input = document.getElementById("todo-input");
const listTask = document.getElementById("todo-list");

let tasks = [];

// Thêm task mới
function addTask(text) {
  const task = {
    id: Date.now(),
    text: text,
    done: false,
  };
  tasks.push(task);
  saveData();
  renderTasks();
}

// Lưu tasks vào localStorage
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tải tasks từ localStorage
function loadData() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    renderTasks();
  }
}

// Render tasks ra giao diện
function renderTasks() {
  listTask.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    if (task.done) {
      li.classList.add("done");
    }

    // Nút sửa
    const edit = document.createElement("div");
    edit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      style="width: 20px; height: 20px;">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1
        2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5
        4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18
        14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1
        3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>`;
    edit.classList.add("edit");
    edit.addEventListener("click", function (e) {
      e.stopPropagation();
      const newText = prompt("Sửa công việc:", task.text);
      if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        saveData();
        renderTasks();
      }
    });

    // Nút xoá
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      style="width: 20px; height: 20px;">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12" />
    </svg>`;
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      saveData();
      renderTasks();
    });

    // Gạch công việc khi click
    li.addEventListener("click", function () {
      task.done = !task.done;
      saveData();
      renderTasks();
    });

    li.appendChild(textSpan);
    li.appendChild(edit);
    li.appendChild(deleteBtn);
    listTask.appendChild(li);
  });
}

// Nút thêm
btn.addEventListener("click", function () {
  const task = input.value.trim();
  if (task !== "") {
    addTask(task);
    input.value = "";
  } else {
    alert("Nhập nội dung công việc");
  }
});

loadData(); // Tải dữ liệu khi mở trang
