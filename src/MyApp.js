import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() {
  const [characters, setCharacters] = useState([]);
 
  async function removeOneCharacter (index) {    
    var user_id = characters[index].id;
    await axios.delete('http://localhost:5001/users/'+user_id); //${user_id}'
    
    setCharacters([...characters]);

    //console.log(characters);
    
  
    /*
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated);
    */
    
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201){
      person = result.data; // updates new person w their ID and stuff
      //console.log(person);
      setCharacters([...characters, person]);
      //console.log([...characters, person]);
    }});
  }

  async function fetchAll(){
    try {
      const response = await axios.get('http://localhost:5001/users');
      return response.data.users_list;     
    }
    catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
    }
  }

  async function makePostCall(person){
    try {
      person['id'] = "";
      const response = await axios.post('http://localhost:5001/users', person);
      //console.log(person['id']);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
          setCharacters(result);
    });
  }, [] );
  
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;