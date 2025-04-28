-- Drop tables if they already exist
DROP TABLE IF EXISTS work_logs;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS projects;

-- Create 'projects' table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT,
  target_working_hours INTEGER
);

-- Create 'members' table
CREATE TABLE members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create 'work_logs' table
CREATE TABLE work_logs (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id),
  member_id TEXT REFERENCES members(id),
  date DATE NOT NULL,
  hours_worked INTEGER,
  description TEXT
);

-- Insert into 'projects'
INSERT INTO projects (id, name, description, status, target_working_hours) VALUES
('1', 'Pulse', 'Description of Pulse', 'active', 40),
('2', 'One Bangkok', 'Description of One Bangkok', 'active', 30);

-- Insert into 'members'
INSERT INTO members (id, name) VALUES
('1', 'John Doe'),
('2', 'Jane Smith');

-- Insert into 'work_logs'
INSERT INTO work_logs (id, project_id, member_id, date, hours_worked, description) VALUES
('1', '1', '1', '2024-03-10', 6, 'Worked on Pulse by John Doe'),
('2', '2', '1', '2024-07-12', 5, 'Worked on One Bangkok by John Doe'),
('3', '1', '2', '2024-09-05', 7, 'Worked on Pulse by Jane Smith'),
('4', '2', '2', '2024-12-20', 6, 'Worked on One Bangkok by Jane Smith'),
('5', '1', '1', '2025-02-10', 8, 'Worked on Pulse by John Doe'),
('6', '2', '1', '2025-03-15', 4, 'Worked on One Bangkok by John Doe'),
('7', '1', '2', '2025-03-20', 3, 'Worked on Pulse by Jane Smith'),
('8', '2', '2', '2025-04-01', 5, 'Worked on One Bangkok by Jane Smith'),
('9', '1', '1', '2025-04-10', 7, 'Worked on Pulse by John Doe'),
('10', '2', '2', '2025-04-20', 6, 'Worked on One Bangkok by Jane Smith');
