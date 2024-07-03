import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axiosInstance from './axiosinterceptor';

const EmployeeFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  useEffect(() => {
    if (location.state && location.state._id) {
      setFormData(location.state);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (formData._id) {
        await axiosInstance.put(`/api/edit/${formData._id}`, formData);
      } else {
        await axiosInstance.post('/api/add', formData);
      }
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width:'100vw',
        backgroundImage: 'url(https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          maxWidth: 600, 
          width: '90%', 
          backgroundColor: 'rgba(255, 255, 255, 0.8)' 
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
          {formData._id ? 'Update Employee' : 'Register New Employee'}
        </Typography>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: 3 }}
        />
        <TextField
          margin="dense"
          name="designation"
          label="Designation"
          type="text"
          fullWidth
          value={formData.designation}
          onChange={handleChange}
          sx={{ marginBottom: 3 }}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          value={formData.location}
          onChange={handleChange}
          sx={{ marginBottom: 3 }}
        />
        <TextField
          margin="dense"
          name="salary"
          label="Salary"
          type="number"
          fullWidth
          value={formData.salary}
          onChange={handleChange}
          sx={{ marginBottom: 4 }}
        />
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          sx={{ 
            display: 'block', 
            width: '100%', 
            backgroundColor: '#1976d2', 
            '&:hover': { backgroundColor: '#115293' } 
          }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default EmployeeFormPage;
