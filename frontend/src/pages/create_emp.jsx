import {React,useState} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Navigation from "./navigation";
import Row from 'react-bootstrap/Row';
import '../styles/login.css'
import axios from "axios";
 
import { useNavigate,Link} from 'react-router-dom'

const CreateEmployee=()=>{
    const [designation, setDesignation] = useState();
    const [name,setName]=useState();
    const [mobile,setMobile]=useState();
    const [email,setEmail]=useState();
    const [gender,setGender]=useState();
    // const [selectedSubjects, setSelectedSubjects] = useState([]);
    // const [image,setImage]=useState();
    const navigate = useNavigate();
    const validateEmail = (email) => {
        // Simple email format regex for validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      };
      const handleGenderChange = (e) => {
        setGender(e.target.value);
      };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedSubjects([...selectedSubjects, value]);
    } else {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !designation || !mobile ) {
       alert("Error:all fiends are required");
      return;
    }
    if (!validateEmail(email)) {
      alert("Error:enter a valid email")
      return;
    }
    const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("mobile", mobile);
  formData.append("designation", designation);  
  formData.append("gender", gender);
  // selectedSubjects.forEach((subject) => formData.append("subjects[]", subject));
  // formData.append("image", image);
    try { navigate("/admin");
      const response = await axios.post("http://localhost:8012/CreateEmp", formData, {
        headers: { "Content-Type": "multipart/form-data"},
      })
      .then((response)=>{
            alert(`Successfully Create employee`);
            // console.log(formData)
            // console.log(response)
            navigate("/admin");
        })
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
    return(
        <>
        <Navigation/>
        <Link to="/admin" className="link">Back</Link>
               
        <div className="form">
        <Form>
            <h2 style={{textAlign:'center', marginBottom:'40px'}}>Create Employee</h2>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={2}>
          Employee Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={name} className='inp_field' onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
        </Col>
      </Form.Group>        
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='inp_field' placeholder="Email" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
        <Form.Label column sm={2}>
          Mobile Number
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" className='inp_field' value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Number" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalDropdown">
          <Form.Label  column sm={2}>Designation</Form.Label>
          <Col sm={10}>
          <Form.Select value={designation}   onChange={(e) => setDesignation(e.target.value)} className="inp_field"  defaultValue='choose' >
          {/* <option value="Choose..." disabled>Choose...</option> */}
            <option>HR</option>
             <option>Manager</option>
            <option>Sales</option>
          </Form.Select>
          </Col>
        </Form.Group>

       
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label   column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10} className="d-flex align-items-center">
            <Form.Check
              type="radio"
              label="M"
              value="M"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              // checked={setGender === 'M'}
            onChange={handleGenderChange}
              inline
            />
            <Form.Check
              type="radio"
              label="F"
              value="F"
              // checked={setGender === 'F'}
            onChange={handleGenderChange}
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              inline
            />
          </Col>
        </Form.Group>
      </fieldset>  

      {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col className="d-flex align-items-center">
        <Form.Label as="legend" column sm={3}>
            Course
          </Form.Label>
          <Form.Check label="MCA" value="MCA" onChange={handleCheckboxChange}/>
          <Form.Check label="BCA" value="BCA" onChange={handleCheckboxChange}/>
          <Form.Check label="BSC" value="BSC" onChange={handleCheckboxChange}/>
 
        </Col>
      </Form.Group> */}
      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Profile Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </Form.Group> */}


      <div className="d-flex align-items-center justify-content-center"><Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 20, offset: 2 }}>
          <Button type="submit" onClick={handleSubmit}>Create Employee</Button>
        </Col>
      </Form.Group>
      </div>
    </Form>
    </div>
    </>



    );
}
export default CreateEmployee;