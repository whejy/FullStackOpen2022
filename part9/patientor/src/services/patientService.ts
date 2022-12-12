import patientsData from '../../data/patients.json';
import { Patient, PublicPatient } from '../types';

const patients: Array<Patient> = patientsData;

const getPatients = (): PublicPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
};

export default {
    getPatients
};