window.addEventListener('load', function (){

// CREATE AN ARRAY OF EMPLOYEES
var employees = [
    { id: '92831724', name: 'Steve Martinez', extension: '6143', email: 'stevemar12@gmail.com', department: 'Administrative' },
    { id: '28195032', name: 'Kai Moe', extension: '9348', email: 'kmoe111@gmail.com', department: 'Executive' },
    { id: '02819248', name: 'Devon Parna', extension: '4382', email: 'parnad2@gmail.com', department: 'Sales' },
    { id: '21849912', name: 'James Pickles', extension: '1332', email: 'jamespickles211@yahoo.com', department: 'Quality Assurance' },
    { id: '28129405', name: 'Johnny Rolf', extension: '3332', email: 'johnnyr02@gmail.com', department: 'Engineering' }
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem('employees')) {
    employees = JSON.parse(localStorage.getItem('employees'));
} else {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// GET DOM ELEMENTS
var form = document.getElementById('addForm');
var empTable = document.getElementById('empTable').getElementsByTagName('tbody')[0];
var empCount = document.getElementById('empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault(); 

    // GET THE VALUES FROM THE TEXT BOXES
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var extension = document.getElementById('extension').value;
    var email = document.getElementById('email').value;
    var department = document.getElementById('department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    var newEmployee = { id, name, extension, email, department };

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById('id').focus();


});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'button') {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            var empId = e.target.parentNode.parentNode.cells[0].textContent;

            // REMOVE EMPLOYEE FROM ARRAY
            employees = employees.filter(emp => emp.id !== empId);

            // BUILD THE GRID
            buildGrid();
        }
    }

});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.innerHTML = '';

    // REBUILD THE TBODY FROM SCRATCH
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (var employee of employees) {
        var row = `<tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td><button class='btn btn-danger btn-sm'>X</button></td>
        </tr>`;
        // BIND THE TBODY TO THE EMPLOYEE TABLE
        empTable.innerHTML += row;
    }

    // UPDATE EMPLOYEE COUNT
    empCount.textContent = employees.length;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees));

};

});
