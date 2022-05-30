function previousPage() {
    history.back()
}

function getFacultyDepartments(event) {
    const faculty_id = event.target.value
    const departmentSelectElement = document.getElementById('department-select')
    let HtmlContent = ''
    fetch(`http://localhost:3000/department/${faculty_id}`)
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

// Registration Form
function registerFormValidation(registerFormObj) {
    for (const [key, value] of Object.entries(registerFormObj)) {
        if (!value) {
            document.getElementById(`${key}Alert`).innerText = `this field is invalid`;
        }
    }
}
function register_onSubmit(event) {
    event.preventDefault()
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    const departmentId = document.getElementById('department-select').value;

    if(!name || !email || !password || password != passwordConfirm || !departmentId) {
        registerFormValidation({name, email, password, passwordConfirm, departmentId})
        return
    }

    fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password, departmentId})
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        showAlert("You have been successfully registered. Login to access lecturers' Schedule")
        setTimeout(() => {window.location.href = `/auth/login`}, 4000)
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