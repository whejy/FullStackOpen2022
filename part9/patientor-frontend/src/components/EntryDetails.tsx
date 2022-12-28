import { Entry } from '../types';
import HospitalDetails from './HospitalDetails';
import OccHealthDetails from './OccHealthDetails';
import HealthCheckDetails from './HealthCheckDetails';

const EntryDetails = (entry: Entry) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalDetails {...entry} />;
    case 'OccupationalHealthcare':
      return <OccHealthDetails {...entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails {...entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
