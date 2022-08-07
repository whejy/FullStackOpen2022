const SearchFilter = ({ onChange }) => {
  return (
    <>
      Filter by name: <input onChange={onChange} />
    </>
  );
};

export default SearchFilter;
