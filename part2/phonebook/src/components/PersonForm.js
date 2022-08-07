const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  phoneChange,
  numberChange,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input value={newName} onChange={phoneChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
