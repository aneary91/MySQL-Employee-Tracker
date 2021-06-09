use employee_db;

INSERT INTO department (name) VALUES
('IT'), 
('HR'), 
('accounting'), 
('RnD'),
('sales');

INSERT INTO role (title, salary, department_id) VALUE
('software Engineer', 80000, 1),    
('Lead software Engineer', 100000, 1),
('HR Officer', 60000, 2),
('accountant', 120000, 3),
('instructional designer', 120000, 4),
("salesman", 100000, 5),
('sales Lead', 150000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE
('Allison', 'Wonderland', 1, NULL),
('Peter', 'Pan', 2, 2),
('Mary', 'Poppins', 3, NULL),
('Dory', 'Fish', 4, NULL),
('Snow', 'White', 5, NULL),
('Cinderella', 'Space Cadet', 6, NULL),
('Pocahontas', 'Smith', 7, 7);



