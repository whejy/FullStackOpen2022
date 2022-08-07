const Search = ({ onChange, search }) => (
  <>
    Find countries: <input onChange={onChange} value={search} />
  </>
);

export default Search;
