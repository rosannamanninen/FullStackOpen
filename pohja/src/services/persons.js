import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
    .then(response => response.data)
    .catch(error => {
    console.log('fail get')
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request
    .then(response => response.data)
    .catch(error => {
    console.log('fail create')
  })
}

const deletePerson = id => {
    
  const request =  axios.delete(`${baseUrl}/${id}`)
  return request
  .then(response => response.data)
  .catch(error => {
    console.log('fail del')
  })
}

export default { 
  getAll, 
  create, 
  deletePerson 
}