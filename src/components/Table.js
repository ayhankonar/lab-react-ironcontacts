import React, {useState} from 'react'
import Row from './Row.js'
import contacts from '../contacts.json'

export default function Table(){

  let num = 5
  const fiveArray = [...contacts]
  fiveArray.length = num
  
  let [contactList, setContacts] = useState(fiveArray)
  let [nameSort, setNameSort] = useState(false)
  let [popSort, setPopSort] = useState(false)

  const deleteContact = id => setContacts(
    contactList.filter(el => el.id !== id)
  )

  /*PREGUNTA: 
  Debe haber otra manera de hacer esto sin tener que usar el 
  spread operator cada vaz, verdad? Me parece muy ineficiente 
  hacerlo cada vez. Me gustaria tener algo mas limpio como el 
  deleteContact de arriba
  */

  const addContact = () => {
    let addArray = [...contactList]
    let random = Math.floor(Math.random()*(contacts.length-num)+num)
    addArray.push(contacts[random])
    setContacts(contactList = addArray)
  }

  const sortName = () => {
    setNameSort(!nameSort)
    let reverse 
    (nameSort) ? reverse=-1 : reverse =1
    let sortNameArray = [...contactList]
    sortNameArray.sort((a,b) => {
      return (a.name).toString().localeCompare(b.name)*reverse
    })
    setContacts(contactList=sortNameArray)
  }

  const sortPopularity = () => {
    setPopSort(!popSort)
    let reverse 
    (popSort) ? reverse=-1 : reverse =1
    let sortPopArray = [...contactList]
    sortPopArray.sort((a,b) => {
      return (a.popularity - b.popularity)*reverse
    })
    setContacts(contactList=sortPopArray)
  }
  
  /*
  PREGUNTA:
  En los primeros dos onClicks de abajo, intente usar algo similar 
  al onClick handleDelete de abajo, pero no me estaba funcionando. 
  Que es la diferencia entre los dos formatos?
  */

  return (
    <div>
      <div>
        <button onClick={addContact}>Add Random Contact</button>
        <button onClick={sortName}>Sort by name</button>
        <button onClick={sortPopularity}>Sort by popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map(el => <Row 
            key={el.id}
            {...el}
            handleDelete={() => deleteContact(el.id)}
          />)}
        </tbody>
      </table>
    </div>
  )
}