const Luettelo = (props) => {
    console.log(props)

    return (
      <>
        {props.persons.map(
          person => 
          person.name.toLowerCase().includes(props.newFilter) ?
           <div key={person.name + 'div'}>
            <p key={person.name + 'text'}>
                {person.name + ' ' + person.number}
            </p> 
            <button 
                key={person.name + 'button'}
                type="button"
                onClick={props.delPerson}
                value = {person}>
                    delete
            </button>
            </div>
            
            : null
          
          )}
      </>
    )
  }

export default Luettelo