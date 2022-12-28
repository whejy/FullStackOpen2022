import { HealthCheckEntry, HealthCheckRating } from '../types';
import Diagnosis from './Diagnosis';
import MedicalInformationRoundedIcon from '@mui/icons-material/MedicalInformationRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const HealthCheckDetails = (entry: HealthCheckEntry) => {
  const healthCheckColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'red';
      default:
        return 'green';
    }
  };

  return (
    <>
      <div>
        {entry.date} <MedicalInformationRoundedIcon />
      </div>
      <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
      <div>
        <FavoriteRoundedIcon
          sx={{ color: healthCheckColor(entry.healthCheckRating) }}
        />
      </div>
      <Diagnosis {...entry} />
    </>
  );
};

export default HealthCheckDetails;
