INSERT INTO department(department_name)
VALUES 
    ('Sales'), 
    ('Engineering'), 
    ('Finance'), 
    ('Legal'), 
    ('Marketing');

INSERT INTO role(title, salary, department_id)
VALUES 
    ('Software Engineer', 120000, 2), 
    ('Mechanical Engineer', 80000, 2), 
    ('Accountant', 75000, 3), 
    ('Salesperson', 90000, 1),
    ('Cold Caller', 43000, 1),
    ('Designer', 57000, 5),
    ('Strategy Specialist', 150000, 5), 
    ('CFO', 420000, 3),
    ('Chief Counsel', 300000, 4),
    ('Lawyer', 200000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ('Asher', 'Bergtraun', 1, null), 
    ('Kelly', 'Manlaibayar', 8, null), 
    ('Brian', 'Chen', 9, null), 
    ('Adam', 'Chinn', 2, 1), 
    ('Keana', 'Smith', 3, 2),
    ('Baklava', 'Goodboy', 10, 3);