import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, Entry } from '../types';

const patients: Array<Patient> = patientsData;

const getPatients = (): PublicPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatient = (patientId: string): Patient | undefined => {
    const patient = patientsData.find(patient => patient.id === patientId);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient: Patient = {
        id: id,
        ...patient,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
    const patient = patientsData.find(patient => patient.id === patientId);
    if (patient) {
        patient.entries.push({...entry});
    } else {
        throw new Error('Patient not found');
    }
    return entry;
};

export default {
    getPatients,
    getPatient,
    addPatient,
    addEntry
};