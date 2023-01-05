import { Form } from 'formik';
// import { useState } from 'react';
import { Entry, EntryType } from '../../types';
import { EntryTypeOption, SelectField } from '../FormField';
import AddEntryForm from './AddEntryForm';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
];

const AddEntryFormWrapper = ({ onSubmit, onCancel }: Props) => {
  //   const [formType, setFormType] = useState('HealthCheck');
  {
    return (
      <>
        <Form className="form ui">
          <SelectField
            label="Entry Type"
            name="type"
            options={entryTypeOptions}
          />
          {/* {setFormType(values.type)} */}
        </Form>
        <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      </>
    );
  }
};

export default AddEntryFormWrapper;
