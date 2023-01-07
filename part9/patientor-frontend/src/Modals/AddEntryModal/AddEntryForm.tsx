import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form, FormikErrors } from 'formik';

import {
  TextField,
  SelectField,
  DiagnosisSelection,
  HealthCheckOption,
  EntryTypeOption,
} from '../FormField';
import {
  HealthCheckRating,
  Entry,
  EntryType,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from '../../types';
import { useStateValue } from '../../state';

// Create a union of all entry types and their properties
export interface EntryFormValues
  extends Omit<Entry, 'id'>,
    Omit<HospitalEntry, 'type' | 'id'>,
    Omit<OccupationalHealthcareEntry, 'type' | 'id'>,
    Omit<HealthCheckEntry, 'type' | 'id'> {}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: EntryType.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
        discharge: { date: '', criteria: '' },
      }}
      onSubmit={onSubmit}
      enableReinitialize
      validate={(values: EntryFormValues) => {
        const parseDate = (date: string) => {
          return /^\d{4}-\d{2}-\d{2}$/gm.test(date);
        };

        const requiredError = 'Field is required';
        const formatError = 'Incorrect format';
        const valueError = 'Invalid value';
        let errors: FormikErrors<EntryFormValues> = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !parseDate(values.date)) {
          errors.date = formatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.HealthCheck) {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          if (
            values.healthCheckRating < HealthCheckRating.Healthy ||
            values.healthCheckRating > HealthCheckRating.CriticalRisk
          ) {
            errors.healthCheckRating = valueError;
          }
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }

          //   The following validation is invalid as 'sickLeave' is an optional type. Leaving for now.

          //     if (values.sickLeave && values.sickLeave.startDate) {
          //       if (!parseDate(values.sickLeave.startDate)) {
          //         errors = {...errors,
          //           sickLeave: {
          //             startDate: formatError,
          //           },
          //         };
          //       }
          //     }
          //     if (values.sickLeave?.endDate) {
          //       if (!parseDate(values.sickLeave?.endDate)) {
          //         errors = {
          //           sickLeave: {
          //             endDate: formatError,
          //           },
          //         };
          //       }
          //     }
        }
        if (values.type === EntryType.Hospital) {
          if (!values.discharge.date) {
            errors = {
              ...errors,
              discharge: { ...errors.discharge, date: requiredError },
            };
          }
          if (values.discharge.date && !parseDate(values.discharge.date)) {
            errors = {
              ...errors,
              discharge: { ...errors.discharge, date: formatError },
            };
          }
          if (!values.discharge.criteria) {
            errors = {
              ...errors,
              discharge: { ...errors.discharge, criteria: requiredError },
            };
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {values.type === EntryType.HealthCheck && (
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={healthCheckOptions}
              />
            )}

            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}

            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
