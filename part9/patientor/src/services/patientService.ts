import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients.json';
import { Patient, PublicPatient, NewPatient } from '../types';

const id = uuid();

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
    const newPatient: Patient = {
        id: id,
        ...patient,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatient,
    addPatient
};