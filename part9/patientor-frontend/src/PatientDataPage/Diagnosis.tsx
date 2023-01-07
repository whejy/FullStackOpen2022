import { useStateValue } from '../state';
import { Entry } from '../types';

const Diagnosis = (entry: Entry) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosis = (code: string): string | undefined => {
    const diagnosis = diagnoses.find((diagnoses) => diagnoses.code === code);
    if (diagnosis) {
      return diagnosis.name;
    }
  };

  return (
    <div>
      <i>Diagnosis by {entry.specialist}</i>
      {entry.diagnosisCodes && (
        <div>
          <ul>
            {entry.diagnosisCodes.map((code, i) => (
              <li key={i}>
                {code}
                <span> - {getDiagnosis(code)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Diagnosis;
