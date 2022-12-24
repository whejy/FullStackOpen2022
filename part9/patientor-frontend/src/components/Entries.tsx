import { Entry } from '../types';

const EntryDetails = (entry: Entry) => {
  return (
    <div>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code, i) => (
            <li key={i}>{code}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryDetails;
