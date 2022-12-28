import { OccupationalHealthcareEntry } from '../types';
import Diagnosis from './Diagnosis';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

const OccHealthDetails = (entry: OccupationalHealthcareEntry) => {
  return (
    <>
      <div>
        {entry.date} <BusinessRoundedIcon /> {entry.employerName}
      </div>
      <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
      {entry.sickLeave && (
        <div>
          Dates of Absence: {entry.sickLeave.startDate} -{' '}
          {entry.sickLeave.endDate}
        </div>
      )}
      <Diagnosis {...entry} />
    </>
  );
};

export default OccHealthDetails;
