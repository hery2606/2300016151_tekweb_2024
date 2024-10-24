const addButton = document.querySelector('.add');
const taskInput = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');
const backgroundColorSelector = document.querySelector('#background-color');
const fontSizeSlider = document.querySelector('#font-size-slider');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const fontStyleSelector = document.querySelector('#font-style');

// Fungsi untuk menambah task baru
addButton.addEventListener('click', addTask);

// Event Listener untuk menambahkan task ketika menekan Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Fungsi untuk menambahkan task ke dalam list
function addTask() {
    const taskValue = taskInput.value.trim();  // Menghapus spasi kosong di awal/akhir
    if (taskValue) {
        addTaskToList(taskValue);
        taskInput.value = '';  // Kosongkan input setelah menambahkan task
        taskInput.focus();  // Kembalikan fokus ke input
    } else {
        alert('Masukkan task terlebih dahulu!');
    }
}

function addTaskToList(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');  // Tambahkan kelas untuk styling

    // Buat checkbox untuk menandai tugas sebagai selesai
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('complete-checkbox');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    // Event untuk tombol Edit
    editButton.addEventListener('click', () => {
        editTask(taskSpan); // Panggil fungsi editTask di sini
    });


    deleteButton.addEventListener('click', () => {
        li.style.transition = 'opacity 0.3s ease';
        li.style.opacity = '0';
        setTimeout(() => li.remove(), 300); // Animasi saat dihapus
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

// Mengubah ukuran font
fontSizeSlider.addEventListener('input', (e) => {
    document.body.style.fontSize = e.target.value + 'px';
});

// Alihkan mode gelap
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Ubah gaya font
fontStyleSelector.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
});










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