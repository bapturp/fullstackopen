const Filter = ({ nameFilter, setNameFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={nameFilter}
        onChange={(event) => setNameFilter(event.target.value)}
      />
    </div>
  );
};

export default Filter;
