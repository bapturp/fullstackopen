const Filter = ({ setSearch, search }) => {
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      filter shown with <input onChange={handleSearch} value={search}></input>
    </div>
  )
}

export default Filter
