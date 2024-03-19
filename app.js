function showForm() {
    let form = document.createElement(`form`);
    let formHtml = `
    <input type="text" maxlength="11" required id = "clsName" placeholder="Class Name">
    <input type="text" maxlength="11" required id = "sbjName" placeholder="Subject">
    <input type="text" maxlength="11" required id = "teacherName" placeholder="Teacher">
    <div id="btns">
        <button id="cancel" onclick="cancelForm()">Cancel</button>
        <input type="submit" value="Create" id="create">
    </div>
`;
    form.innerHTML = formHtml;
    document.getElementById(`container`).before(form);
    let formDiv = document.body.children[1];
    formDiv.setAttribute(`onsubmit`, `createClass()`);
    formDiv.classList.add(`form`);
    event.target.style.display = `none`
}

function cancelForm() {
    document.querySelector(`.form`).remove();
    document.getElementById(`create-btn`).style.display = `block`
}

function createClass() {
    let clsName = document.getElementById(`clsName`).value;
    let sbjName = document.getElementById(`sbjName`).value;
    let tchrName = document.getElementById(`teacherName`).value;
    let userData = JSON.parse(localStorage.getItem(`ClassRooms`)) ?? [];
    let todo = {
        className: clsName,
        subjectName: sbjName,
        teacherName: tchrName,
    };
    userData.push(todo);
    localStorage.setItem(`ClassRooms`, JSON.stringify(userData));
    document.getElementById(`create-btn`).style.display = `block`
}

function displayData() {
    let main = document.getElementById(`container`);
    let userData = JSON.parse(localStorage.getItem(`ClassRooms`)) ?? [];
    for (let i = 0; i < userData.length; i++) {
        main.innerHTML += `
        <div id="classRoom">
    <div>
    <h2>Class : ${userData[i].className}</h2>
    <h3>Teacher : ${userData[i].teacherName}</h3>
    <h3>Subject : ${userData[i].subjectName}</h3>
    <h3 style="display: none;" id = "classNumber">${i}</h3>
    </div>
    <div>
    <button  id="del" onclick="deleteCalass()">Delete</button>
    </div>
</div>
        `;
    }
}
displayData();

function deleteCalass() {
    let userData = JSON.parse(localStorage.getItem(`ClassRooms`)) ?? [];
    let classNumber = event.target.parentNode.parentNode.children[0].children[3].innerText;
    userData.splice(classNumber, 1);
    localStorage.setItem(`ClassRooms`, JSON.stringify(userData));
    displayData();
    window.location.reload(true);
}