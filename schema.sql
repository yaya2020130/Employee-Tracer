DROP DATABASE IF EXISTS system_DB;
CREATE DATABASE system_DB;
USE  system_DB;

CREATE TABLE department
(
 id INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  dept_name  VARCHAR(30) NOT NULL,
  primary key (id)
);

CREATE TABLE roles
(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title  VARCHAR(30) ,
  salary DECIMAL(10 ,2 ) NOT NULL,
 department_id INT UNSIGNED NOT NULL,
 CONSTRAINT fk_department foreign key(department_id) references department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT ,
firstname VARCHAR(50) NOT NULL,
lastname varchar (30) NOT NULL,
 roleid int UNSIGNED NOT NULL,
INDEX role_id(roleid),
 CONSTRAINT fk_role foreign key (roleid) references roles(id) ON DELETE CASCADE,  
 manager_id int UNSIGNED DEFAULT NULL,
 INDEX man_id (manager_id),
 CONSTRAINT fk_man foreign key (manager_id) references employee(id) ON DELETE SET NULL
)
;