const Filter = ({ setSearch, search }) => {
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      <label>Filter shown with:</label>
      <input onChange={handleSearch} value={search}></input>
    </div>
  )
}

export default Filter
