import { State } from "./state";
import { Diagnoses, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnoses[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setDiagnosesList = (diagnoses: Diagnoses[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses,
  };
};

export const addEntry = (entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: entry
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
        };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient = state.patient;

      if (patient) {
        if (patient.entries) {
          patient.entries = [...patient.entries, action.payload];
        } else {
          patient.entries = [action.payload];
        }
      }
      return {
        ...state,
        patient: patient
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};
