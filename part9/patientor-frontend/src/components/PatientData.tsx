/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import EntryDetails from './EntryDetails';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Entry, Patient } from '../types';
import { useStateValue, setPatient, addEntry } from '../state';
import { apiBaseUrl } from '../constants';
import {
  Box,
  Button,
  Typography,
  TableCell,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddEntryModal from '../Modals/AddEntryModal';
import { EntryFormValues } from '../Modals/AddEntryModal/AddEntryForm';

const PatientData = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  const submitNewEntry = async (values: EntryFormValues) => {
    if (id) {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addEntry(id, newEntry));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
          setError(
            String(e?.response?.data?.error) || 'Unrecognized axios error'
          );
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button
            variant="contained"
            color="default"
            onClick={() => openModal()}
          >
            Add New Entry
          </Button>
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
