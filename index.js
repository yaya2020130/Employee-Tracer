var mysql = require("mysql");
var { prompt } = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "system_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init()
});


//prompts here
const initialPrompt = {
    type: "list",
    choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Role", "Add Department", "Update Employee Role"],
    message: "What would you like to do?",
    name: "choice"
}
const addEmpPrompt = [
    {
    message: "what is the employee's first name?",
    name: 'firstname',
},
{
    message: "what is the employee's last name?",
    name: 'lastname',
},
{
    message: "what is the employee's manager id?",
    name: 'manager_id',
},
{
    message: "what is the employee's role id?",
    name: 'roleid',
},
]
const addDepPrompt = {
    message: "What is the new department's name?",
    name: "dept_name"
}
const addRolePrompt = [
    {
        message: "What is the title of the role?",
        name: "title"
    },
    {
        message: "What is the salary of this role?",
        name: "salary"
    },
    {
        message: "What is the department id of this role?",
        name: "department_id"
    },
]
const updateEmployeeRolePrompt=[
    {
        message:"what s the first name of the employe?",
        name:"firstname"
    }
    ,
    {
        message:"what is the role of the employee",
        name:"title"
    }
    


   
]

//init inquirer function
async function init() {
    const { choice } = await prompt(initialPrompt);
    switch (choice) {
        case "View All Employees":
            findAllEmployees();
            break;
        case "View All Departments":
            findDepartments();
            break;
        case "View All Roles":
            findRoles();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
    }
}


function findAllEmployees() {
    connection.query('SELECT * FROM employee', function(err,data){
        if(err) throw err;
        console.log(data)
    })
}

function findRoles(){
    connection.query('SELECT * FROM roles', function(err,data){
        if(err) throw err;
        console.log(data)
    })
}

function findDepartments() {
    connection.query('SELECT * FROM department', function(err,data){
        if(err) throw err;
        console.log(data)
    })
}

async function addDepartment(){
    const newDep = await prompt(addDepPrompt);
    connection.query("INSERT INTO department SET ?", newDep, function(err, data){
        if(err)throw err;
        console.log(data)
    })
}

async function addEmployee(){
    const newEmp = await prompt(addEmpPrompt)
    connection.query("INSERT INTO employee SET ?", newEmp, function(err,data){
        if(err)throw err;
        console.log(data)
    })
}

async function addRole(){
    const newRole = await prompt(addRolePrompt);
    connection.query("INSERT INTO roles SET ?", newRole, function(err,data){
        if(err)throw err;
        console.log(data)
    })
}

function updateEmployeeRole(){

}


 function readDataAndAskQuestions(err, data) {
     if (err) throw err;
     console.table(data);
     init();
 }

