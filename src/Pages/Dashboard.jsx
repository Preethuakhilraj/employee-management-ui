import { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axiosInstance from './axiosinterceptor';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem('user'))?.role;
    const storedUsername = JSON.parse(localStorage.getItem('user'))?.username;
    setRole(storedRole);
    setUser(storedUsername);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/view');
      console.log('Data response:', response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="5vh"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const handleUpdate = (row) => {
    navigate('/form', { state: row });
  };

  const handleDelete = async (row) => {
    try {
      await axiosInstance.delete(`/api/remove/${row._id}`);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Box 
      component="main" 
      sx={{ 
        marginTop: '100px', 
        marginLeft: '100px', 
        p: 3, 
        width: '85vw' 
      }}
    > 
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          display: 'flex', 
          marginBottom: 2 
        }}
      >
        Welcome {user}!
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: 3 
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold' 
          }}
        >
          EMPLOYEE LIST
        </Typography>
      </Box>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="employee table">
          <TableHead>
            <TableRow sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
              <TableCell>EMPLOYEE ID</TableCell>
              <TableCell>EMPLOYEE NAME</TableCell>
              <TableCell align="left">DESIGNATION</TableCell>
              <TableCell align="left">LOCATION</TableCell>
              <TableCell align="left">SALARY</TableCell>
              {role === 'admin' && <TableCell align="left"></TableCell>}
              {role === 'admin' && <TableCell align="left"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: 'common.white',
                  },
                }}
              >
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.designation}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.salary}</TableCell>
                {role === 'admin' && (
                  <>
                    <TableCell align="left">
                      <IconButton onClick={() => handleUpdate(row)} color="primary">
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <IconButton onClick={() => handleDelete(row)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
