import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Patient } from '../types';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import {
  Box,
  Typography,
  TableCell,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientData = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        try {
          const { data: patientData } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({
            type: 'SET_PATIENT',
            payload: patientData,
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    if (!patient || patient.id !== id) {
      void getPatient();
    }
  }, [id]);

  return (
    <div>
      {patient && (
        <div>
          <Box>
            <Typography align="center" variant="h6">
              {patient.name}
            </Typography>
          </Box>
          <Table style={{ marginBottom: '1em' }}>
            <TableHead>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>SSN</TableCell>
                <TableCell>Occupation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
                </TableCell>
                <TableCell>{patient.ssn}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PatientData;
