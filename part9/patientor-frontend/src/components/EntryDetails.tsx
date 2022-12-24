import { Entry } from '../types';
import { useStateValue } from '../state';

const EntryDetails = (entry: Entry) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosis = (code: string): string | undefined => {
    const diagnosis = diagnoses.find((diagnoses) => diagnoses.code === code);
    if (diagnosis) {
      return diagnosis.name;
    }
  };

  return (
    <div>
      <div>{entry.date}</div>
      <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code, i) => (
            <li key={i}>
              {code}
              <span> - {getDiagnosis(code)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryDetails;
