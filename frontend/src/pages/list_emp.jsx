import { React, useState,useEffect } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";
import Navigation from "./navigation";
// import useNavigate from "react-router-dom"
import { useNavigate} from 'react-router-dom'
 

const ListEmployee=()=>{
  const navigate=useNavigate();
    const [employees,setEmployees]=useState([]);
        // Fetch employees on component mount
        useEffect(() => {
            const fetchEmployees = async () => {
              try {
                const response = await axios.get("http://localhost:8012/ListEmp");
                console.log(response.data);
                setEmployees(response.data || []); 
                // console.log(response.data.employees);
              } catch (error) {
                console.error("Error fetching employees:", error);
              }
            };
      
          fetchEmployees();
        }, []);
         

        const handleDelete = async (email) => {
          if (window.confirm("Are you sure you want to delete this employee?")) {
            try {  
              // console.log(id)
              const response = await axios.delete(`http://localhost:8012/DeleteEmp/${email}`)
              .then((response)=>{
              alert(`Employee deleted successfully!`);
              navigate(0);
               })
              // console.log(response.data);

              // Optionally, refresh the employee list after deletion
              // fetchEmployees(); // Assuming you have a function to fetch all employees
            } catch (error) {
              console.error("Error deleting employee:", error);
              if (error.response) {
                alert(`Failed to delete  : ${error.response.data.message || "Server error"}`);
              } else {
                alert("Failed to delete employee: Network error");
              }
            }
          }
        };



        return(
        <><Navigation/>
        <Container style={{marginTop:'50px'}}>
          <Link to="/admin" className="link">Back</Link>
          
          <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>Unique Id</th> */}
            {/* <th>Image</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            {/* <th>Courses Enrolled</th> */}
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.email}>
                {/* <td>{emp.email}</td> */}
                {/* <td>
                  <img
                    src={`http://localhost:8012/uploads/${emp.image}`}
                    alt={emp.image}
                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                  /><p>{emp.image}</p>
                  </td> */}
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                {/* <td>{emp.subjects.join(',')}</td> */}
                {/* <td>{emp.course}</td> */}
                <td>{emp.create_date}

                  
                </td>
                <td>
                  <Link to={`/edit_emp/`+emp.email}>
                    <Button variant="info" >Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(emp.email)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No employees found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>


        
        
    </Container>

        </>
    );
}
export default ListEmployee;