const HOST_URL = 'http://lecturer-schedule.herokuapp.com';
// const HOST_URL = 'http://localhost:3000';

window.onload = () => {

    let cookie = document.cookie;
    let startIndex =  cookie.indexOf('USER_LOGGED');
    let tokenStartIndex = cookie.indexOf('=', startIndex) + 1
    let token = cookie.substring(tokenStartIndex)

    if (token.length < 10) {
        document.getElementById('logout-btn').remove();
        document.getElementById('user-email').remove();
    }
}

function previousPage() {
    history.back()
}

function getFacultyDepartments(event) {
    const faculty_id = event.target.value
    const departmentSelectElement = document.getElementById('department-select')
    let HtmlContent = ''
    fetch(`${HOST_URL}/department/${faculty_id}`, {credentials: 'include'})
    .then(res => res.json())
    .then(res => {
        res.forEach(department => {
            HtmlContent += `<option value=${department.id}> ${department.name}</option>`
        });
        departmentSelectElement.innerHTML = HtmlContent
    })
    .catch(err => {
        console.log(err);
        HtmlContent = '<option> Error fetching departments</option>'
        departmentSelectElement.innerHTML = HtmlContent
    })
}

function formValidationAlert(registerFormObj) {
    for (const [key, value] of Object.entries(registerFormObj)) {
        if (!value) {
            document.getElementById(`${key}Alert`).innerText = `this field is invalid`;
        }
    }
}
// Registration Form
function toggleStudentFieldsDisplay(e) {
    if (e.target.value != 'student') {
        let studentFields = document.getElementById('student-only')
        studentFields.style.display = 'none';
    } else {
        let studentFields = document.getElementById('student-only')
        studentFields.style.display = 'block';
    }
}
function register_onSubmit(event) {
    event.preventDefault()

    let studentRadio = document.getElementsByName('role')[0];
    let lecturerRadio = document.getElementsByName('role')[1];

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    const departmentId = studentRadio.checked ? document.getElementById('department-select').value : '';
    let role = '';

    if (studentRadio.checked) {
        role = 'student'
        if(!name || !email || !password || password != passwordConfirm || !departmentId) {
            formValidationAlert({name, email, password, passwordConfirm, departmentId})
            return
        }

    } else if (lecturerRadio.checked){
        role = 'lecturer'
        if(!name || !email || !password || password != passwordConfirm) {
            formValidationAlert({name, email, password, passwordConfirm})
            return
        }
        
    }
    
    fetch(`${HOST_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(studentRadio.checked ? {name, email, password, role, departmentId} : {name, email, password, role})
    })
    .then(res => res.json())
    .then(res => {
        if (res.id) {
            showAlert("You have been successfully registered. Login to access lecturers' Schedules")
            setTimeout(() => {window.location.href = `/auth/login`}, 3000)
        }
    })
    .catch(err => {
        console.log(err);
    })
}

function login_post(event) {
    event.preventDefault()
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    let role = ''

    if (!password || !email) {
        formValidationAlert({password, email})
        return
    }
    // Role
    let studentRadio = document.getElementsByName('role')[0];
    let lecturerRadio = document.getElementsByName('role')[1];
        
    for(i = 0; i < 2; i++) {
        if(studentRadio.checked)
            role = studentRadio.value;
        else
            role = lecturerRadio.value;
    }
    // Request
    fetch(`${HOST_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({email, password, role})
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if (res.id) {
            if (role == 'student') return window.location.href = `/lecturer`;
            if (role == 'lecturer') return window.location.href = `/schedule/edit/${res.id}`
        }
        else showAlert(res)
    })
    .catch(err => {
        console.log(err);
    })
}

// ALERT
function showAlert(content) {
    document.getElementById('alert-content').innerText = content;
    document.getElementById('alert-box').style.display = 'flex';
}
function alertClose() {
    document.getElementById('alert-box').style.display = 'none';
    document.getElementById('alert-content').innerText = '';
}

function createSchedule(lecturer_id) {
    fetch(`${HOST_URL}/schedule/${lecturer_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
        if (res) {
            showAlert('Schedule Created');
            setTimeout(() => {window.location.href = `/schedule/edit/${res}`}, 3000)
        }
    })
    .catch(err => {
        console.log(err);
    })
}
function deleteSchedule(lecturer_id) {
    fetch(`${HOST_URL}/schedule/${lecturer_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
        if (res) {
            showAlert('Schedule deleted');
            setTimeout(() => {window.location.href = `/schedule/edit/${res}`}, 3000)
        }
    })
    .catch(err => {
        console.log(err);
    })
}
function updateSchedule(e) {
    const id = e.target.id;
    let mon = document.getElementById(`${id}-mon`).value;
    let tue = document.getElementById(`${id}-tue`).value;
    let wed = document.getElementById(`${id}-wed`).value;
    let thu = document.getElementById(`${id}-thu`).value;
    let fri = document.getElementById(`${id}-fri`).value;

    fetch(`${HOST_URL}/schedule/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({mon,tue,wed,thu,fri})
    })
    .then(res => res.json())
    .then(res => {
        if (res) {
            showAlert('Schedule updated')
        }
        //remove changed textarea's <td> background highlight
        let trChildren = e.target.parentElement.parentElement.children
        for (var i = 0; i < trChildren.length; i++) {
            trChildren[i].style.backgroundColor = 'inherit';
          }
    })
    .catch(err => {
        console.log(err);
    })
}

function logout() {
    document.cookie = ''
    fetch(`${HOST_URL}/auth/logout`, {credentials: "include",})
    .then(res => res.json())
    .then(res => {
        setTimeout(() => {window.location.href = `/`}, 2000)
    })
}

document.querySelectorAll('textarea').forEach(item => {
    //highlight background of changed textarea's <td>
    item.addEventListener('change', event => {
      item.parentElement.style.backgroundColor = '#ffbf0080';
    })
})