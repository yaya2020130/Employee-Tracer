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
    choices: ["View All Employees", "View All Departments", "View All Roles", "View Employees By Manager" , "View Total Budget For Department", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Update Employee Manager", "Delete Employee", "Delete Department", "Delete Role","Quit"],
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
const updateEmployeeRolePrompt =[
    {
        message:"what s the id the employee?",
        name:"id"
    }
    ,
    {
        message:"what is the new role id of the employee?",
        name:"roleid"
    }
]
const updateEmployeeManagerPrompt = [
    {
        message: "What is the id of the employee?",
        name: 'id'
    },
    {
        message: "What is the new manager's id?",
        name: 'man_id'
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
        case "View Employees By Manager":
            viewEmployeeByManager();
            break;
        case "View Total Budget For Department":
            viewDepartmentBudget();
            break;
        case "Update Employee Manager":
            updateEmployeeManager();
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
        case "Delete Employee":
            deleteEmployee();
            break;
        case "Delete Department":
            deleteDepartment();
            break;
        case "Delete Role":
            deleteRole();
            break;
        case "Quit":
            connection.end();
            break;
    }
}


function findAllEmployees() {
    connection.query('SELECT * FROM employee', function(err,data){
        if(err) throw err;
        readDataAndAskQuestions(data)
    })
}


function findRoles(){
    connection.query('SELECT * FROM roles', function(err,data){
        if(err) throw err;
        readDataAndAskQuestions(data)
    })
}

function findDepartments() {
    connection.query('SELECT * FROM department', function(err,data){
        if(err) throw err;
        readDataAndAskQuestions(data)
    })
}

async function viewEmployeeByManager(){
    const {id} = await prompt({message: "What is the manager's id?", name:'id'});
    connection.query('SELECT * FROM employee WHERE ?', {manager_id:id}, function(err,data){
        if(err) throw err;
        readDataAndAskQuestions(data)
    })
}

async function viewDepartmentBudget(){
    //ask for dep id
    //query db, do a join on all roles that have the dep id, combine budget
}

async function addDepartment(){
    const newDep = await prompt(addDepPrompt);
    connection.query("INSERT INTO department SET ?", newDep, function(err, data){
        if(err)throw err;
        readDataAndAskQuestions(data)
    })
}

async function addEmployee(){
    const newEmp = await prompt(addEmpPrompt)
    connection.query("INSERT INTO employee SET ?", newEmp, function(err,data){
        if(err)throw err;
        readDataAndAskQuestions(data)
    })
}

async function addRole(){
    const newRole = await prompt(addRolePrompt);
    connection.query("INSERT INTO roles SET ?", newRole, function(err,data){
        if(err)throw err;
        readDataAndAskQuestions(data)
    })
}

async function updateEmployeeRole(){
    const {id, roleid} = await prompt(updateEmployeeRolePrompt);
    //const id = await......id;
   // const roleid = await......roleid
    connection.query(
      "UPDATE employee SET ? WHERE ?",[{roleid:roleid},{id:id}], function(err,data){
        if(err)throw err;
        readDataAndAskQuestions(data)
      })
    }

async function updateEmployeeManager(){
    const {man_id, id} = await prompt(updateEmployeeManagerPrompt);
    connection.query('UPDATE employee SET ? WHERE ?', [{manager_id:man_id},{id:id}], function(err,data){
        if(err)throw err;
        readDataAndAskQuestions(data)
    })
}

async function deleteEmployee(){
    const {id} = await prompt({message: "What is the id of the employee?", name: 'id'});
    connection.query("DELETE FROM employee WHERE ?", {id:id}, function(err,data){
        if(err)throw err;
        readDataAndAskQuestions(data)
    })
}

async function deleteDepartment(){
    const {id} = await prompt({message: "What is the id of the department?", name: 'id'});
    connection.query("DELETE FROM department WHERE ?", {id:id}, function(err,data){
        if(err)throw err;
        readDataAndAskQuestions(data)
    })
}

async function deleteRole(){
    const {id} = await prompt({message: "What is the id of the role?", name: 'id'});
    connection.query("DELETE FROM roles WHERE ?", {id:id}, function(err,data){
        if(err)throw err;
        readDataAndAskQuestions(data)
    })
}



  function readDataAndAskQuestions(data) {
    console.table(data);
    init();
}
