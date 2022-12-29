import { v1 as uuid } from 'uuid';
import { NewPatient, Gender, EntryType, NewEntry, HealthCheckEntry, HealthCheckRating, OccupationalHealthcareEntry, HospitalEntry, Entry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckType = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(param);
};

const parseString = (label: string, text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${label} details`);
    }
    return text;
};

const parseDate = (label: string, date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${label} details`);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing Gender details');
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (leave: any): {startDate: string, endDate: string} | undefined => {
    if (leave) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Object.values(leave).forEach(date => {
            if (!isString(date) || !isDate(date)) {
                throw new Error('Incorrect or missing Sick Leave details');
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return {startDate: leave.startDate, endDate: leave.endDate};
    }
    return;
};

const parseHealthCheck = (rating: unknown): HealthCheckRating => {
    if (!isHealthCheckType(rating)) {
        throw new Error('Incorrect or missing Health Check Rating');
    }
    return rating;
};

const parseEntryType = (entryType: unknown): EntryType => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error('Incorrect or missing Entry Type');
    }
    return entryType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString("Patient Name", object.name),
        dateOfBirth: parseDate("Patient Date of Birth", object.dateOfBirth),
        ssn: parseString("Patient SSN", object.ssn),
        occupation: parseString("Patient Occupation", object.occupation),
        gender: parseGender(object.gender),
        entries: [],
    };
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): Entry => {
    const baseEntry: NewEntry = {
        type: parseEntryType(object.type),
        description: parseString("Entry Description", object.description),
        date: parseDate("Entry Date", object.date) ,
        specialist: parseString("Entry Specialist", object.specialist),
    };

    const id = uuid();

    switch (object.type) {
        case "HealthCheck":
            const newHealthCheck: HealthCheckEntry = {
                ...baseEntry,
                id: id,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheck(object.healthCheckRating)
            };
            return newHealthCheck;
        case "OccupationalHealthcare":
            const newOccupationalHealthcare: OccupationalHealthcareEntry = {
                ...baseEntry,
                id: id,
                type: "OccupationalHealthcare",
                employerName: parseString("Employer Name", object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
            return newOccupationalHealthcare;
        case "Hospital":
            const newHospital: HospitalEntry = {
                ...baseEntry,
                id: id,
                type: 'Hospital',
                discharge: {
                    date: parseDate("Discharge Date", object.discharge.date),
                    criteria: parseString("Discharge Criteria", object.discharge.criteria)
                }
            };
            return newHospital;
        default:
            throw new Error('Incorrect or missing Entry Type');
    }
};