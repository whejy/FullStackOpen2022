import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  SelectField,
  DiagnosisSelection,
  HealthCheckOption,
  EntryTypeOption,
} from '../FormField';
import { HealthCheckRating, Entry, EntryType } from '../../types';
import { useStateValue } from '../../state';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

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

const additionalFields = (type: string) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <SelectField
          label="Health Check Rating"
          name="healthCheckRating"
          options={healthCheckOptions}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer"
            name="employer"
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
      );
    case 'Hospital':
      return (
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
      );
    default:
      break;
  }
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  //   const baseInitValues = {
  //     description: '',
  //     date: '',
  //     specialist: '',
  //   };

  //   const occupationalInitValues = {
  //     ...baseInitValues,
  //     type: 'OccupationalHealthcare' as const,
  //     employerName: '',
  //     sickLeave: { startDate: '', endDate: '' },
  //   };

  //   const hospitalInitValues = {
  //     ...baseInitValues,
  //     type: 'Hospital' as const,
  //     discharge: { date: '', criteria: '' },
  //   };
  //   const healthInitValues = {
  //     ...baseInitValues,
  //     type: 'HealthCheck' as const,
  //     healthCheckRating: HealthCheckRating.Healthy as const,
  //   };

  //   const initialValues = () => {
  //     switch (formType) {
  //       case 'OccupationalHealthcare':
  //         return occupationalInitValues;
  //       case 'Hospital':
  //         return hospitalInitValues;
  //       default:
  //         return healthInitValues;
  //     }
  //   };

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      enableReinitialize
      validate={(values) => {
        const requiredError = 'Field is required';
        const formatError = 'Incorrect format';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/gm.test(values.date)) {
          errors.date = formatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
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
            {additionalFields(values.type)}
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
