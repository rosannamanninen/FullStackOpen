const Filtteri = (props) => {

    return (
      <form>
          <div>
            name: <input value={props.newFilter} onChange={props.handleFilterChange}/>
          </div>
        </form>
    )
  }

export default Filtteri