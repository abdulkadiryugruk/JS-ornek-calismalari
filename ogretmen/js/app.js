let students = [];
let isEditing = false;
let currentIndex = null;

const clearForm = () => document.querySelectorAll("input").forEach(input => input.value = "");

const renderTable = () => {
    const table = document.querySelector("#studentTable");
    table.innerHTML = students.map((student, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td style="color: ${student.grade >= 60 ? 'green' : 'red'}">
                ${student.grade >= 60 ? 'Başarılı' : 'Başarısız'}
            </td>
            <td>
                <button onclick="editStudent(${index})">Düzenle</button>
                <button onclick="deleteStudent(${index})">Sil</button>
            </td>
        </tr>
    `).join("");
};

const addOrUpdateStudent = () => {
    const name = document.querySelector("#name").value;
    const grade = document.querySelector("#grade").value;

    if (isEditing) {
        students[currentIndex] = { name, grade };
        isEditing = false;
    } else {
        students.push({ name, grade });
    }

    clearForm();
    renderTable();
};

const editStudent = index => {
    currentIndex = index;
    isEditing = true;

    const student = students[index];
    document.querySelector("#name").value = student.name;
    document.querySelector("#grade").value = student.grade;
};

const deleteStudent = index => {
    students.splice(index, 1);
    renderTable();
};
