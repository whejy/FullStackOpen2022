import { Entry, EntryType } from '../types';
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
    case EntryType.Hospital:
      return <HospitalDetails entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccHealthDetails entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
