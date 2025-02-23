import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeManagementTable = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", birthdate: "", salary: "" });
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    // Fetch employees from API
    const fetchEmployees = () => {
        axios.get("http://localhost:3001/employees")
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees", error));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle add or update employee
    const handleSubmit = (e) => {
        e.preventDefault();

        // If editing an existing employee, update them
        if (editingEmployeeId) {
            axios.put(`http://localhost:3001/employees/${editingEmployeeId}`, formData)
                .then(() => {
                    fetchEmployees();  // Refresh the employee list
                    setFormData({ firstName: "", lastName: "", email: "", birthdate: "", salary: "" });
                    setEditingEmployeeId(null); // Reset editing state
                })
                .catch(error => console.error("Error updating employee", error));
        } else {
            // If not editing, add a new employee
            axios.post("http://localhost:3001/employees", formData)
                .then(() => {
                    fetchEmployees();  // Refresh the employee list
                    setFormData({ firstName: "", lastName: "", email: "", birthdate: "", salary: "" }); // Clear form
                })
                .catch(error => console.error("Error adding employee", error));
        }
    };

    // Handle editing an employee
    const handleEdit = (employee) => {
        setFormData({
            firstName: employee.first_name,
            lastName: employee.last_name,
            email: employee.email,
            birthdate: employee.birthdate,
            salary: employee.salary,  // Include salary for editing
        });
        setEditingEmployeeId(employee.employee_id);  // Set the ID of the employee being edited
    };

    // Handle deleting an employee
    const handleDelete = (employee_id) => {
        axios.delete(`http://localhost:3001/employees/${employee_id}`)  // Pass employee_id
            .then(() => fetchEmployees())  // Refresh employee list after deletion
            .catch(error => console.error("Error deleting employee", error));
    };

    return (
        <div>
            <section>
                <h2>Employee List</h2>
                <table id="employeeTable">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Birthdate</th>
                            <th>Salary</th> {/* New column for Salary */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.employee_id}>  {/* Use employee_id as key */}
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.birthdate}</td>
                                <td>{employee.salary}</td>  {/* Display salary */}
                                <td>
                                    <button onClick={() => handleEdit(employee)}>Edit</button>
                                    <button onClick={() => handleDelete(employee.employee_id)}>Delete</button>  {/* Pass employee_id */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <hr />

            <section>
                <h2>{editingEmployeeId ? "Edit Employee" : "Add New Employee"}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="birthdate">Birthdate:</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <button className="btn btn-primary" type="submit">
                        {editingEmployeeId ? "Update Employee" : "Add Employee"}
                    </button>
                </form>
            </section>

            <br />
            <br />
            <hr />
            <footer>
                <p>&copy; 2025 CodeCraft Labs. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default EmployeeManagementTable;
