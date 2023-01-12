
const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => 
    <>{parts.map(part => (<Part
      part={part} key={part.id}
    />))}     
    </>
  
  const Total = (props) => {
    return (
      <p><b>Number of exercises {props.sum}</b></p>
    )
  }
  
  const Course = (props) => { 
    return (
    <>
      <Header course = {props.course}/>
      <Content parts = {props.course.parts}/> 
      <Total sum = {props.course.parts.reduce(  (a, b) =>  {
    return(
      a + 1
    )},
    0
  
  )}/>
    </>
    )
  }



export default Course;