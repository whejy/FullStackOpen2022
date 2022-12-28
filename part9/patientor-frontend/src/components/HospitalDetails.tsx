import { HospitalEntry } from '../types';
import Diagnosis from './Diagnosis';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

const HospitalDetails = (entry: HospitalEntry) => {
  return (
    <>
      <div>
        {entry.date} <LocalHospitalRoundedIcon />
      </div>
      <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
      <div>Discharged: {entry.discharge.date}</div>
      <div>Criteria: {entry.discharge.criteria}</div>
      <Diagnosis {...entry} />
    </>
  );
};

export default HospitalDetails;
