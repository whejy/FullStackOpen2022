import axios from 'axios';
import EntryDetails from './Entries';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Patient } from '../types';
import { useStateValue, setPatient } from '../state';
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
          dispatch(setPatient(patientData));
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
                  {patient.gender === 'male' ? (
                    <MaleIcon />
                  ) : patient.gender === 'female' ? (
                    <FemaleIcon />
                  ) : (
                    <span>Other</span>
                  )}
                </TableCell>
                <TableCell>{patient.ssn}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {patient.entries.length > 0 && (
            <div>
              <h2>Entries</h2>
              {patient.entries.map((entry, i) => (
                <div style={{ marginBottom: '20px' }} key={i}>
                  <EntryDetails {...entry} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientData;
