const addButton = document.querySelector('.add');
const taskInput = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');
const backgroundColorSelector = document.querySelector('#background-color');
const fontSizeSlider = document.querySelector('#font-size-slider');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const fontStyleSelector = document.querySelector('#font-style');

// menambahkan task baru
addButton.addEventListener('click', addTask);

// Event Listener untuk menambahkan task ketika menekan Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// menambahkan task ke dalam list
function addTask() {
    const taskValue = taskInput.value.trim();  
    if (taskValue) {
        addTaskToList(taskValue);
        taskInput.value = '';  
        taskInput.focus();  
    } else {
        alert('Masukkan task terlebih dahulu!');
    }
}

function addTaskToList(task) {
    const li = document.createElement('li');
    li.classList.add('task-item'); 

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('complete-checkbox');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    // Membuat tombol Edit dengan ikon pensil
    const editButton = document.createElement('button');
    editButton.innerHTML = '✏️ Edit';
    editButton.classList.add('edit');

    // Membuat tombol Delete dengan ikon tong sampah
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '🗑️ Delete';
    deleteButton.classList.add('delete');

    editButton.addEventListener('click', () => {
        editTask(taskSpan); 
    });

    deleteButton.addEventListener('click', () => {
        li.style.transition = 'opacity 0.3s ease';
        li.style.opacity = '0';
        setTimeout(() => li.remove(), 300); 
    });
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    setTimeout(() => li.classList.add('show'), 10);
}




// Mengubah warna latar belakang
backgroundColorSelector.addEventListener('change', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

// untuk ukuran font hanya untuk daftar to-do
fontSizeSlider.addEventListener('input', (e) => {
    const taskItems = document.querySelectorAll('#task-list li span'); 
    taskItems.forEach(item => {
        item.style.fontSize = e.target.value + 'px'; 
    });
});


// untuk mode gelap
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


// vode untuk mengubah font sytl
fontStyleSelector.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
});










//fungsi untuk mengedit task
function editTask(taskSpan) {
    const currentText = taskSpan.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '100%';
    input.style.padding = '5px';
    input.style.border = '2px solid #764ba2';
    input.style.borderRadius = '5px';

    taskSpan.parentNode.replaceChild(input, taskSpan);
    input.focus();

    function saveEdit() {
        const newText = input.value.trim();
        if (newText) {
            taskSpan.textContent = newText;
        }
        input.parentNode.replaceChild(taskSpan, input);
    }

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}





















// Fungsi untuk mengubah tema

const themeSelector = document.querySelector('#theme-selector');
themeSelector.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    document.body.className = ''; // Reset semua kelas tema
    document.body.classList.add(selectedTheme); // Tambahkan kelas tema baru
});
