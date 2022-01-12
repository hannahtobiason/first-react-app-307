import React, {useState} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'
import React, {uesState, useEffect} from 'react'


function MyApp() {
  const [characters, setCharacters] = useState([]);
    return (
      <div className="container">
        <Table characterData={characters} removeCharacter = {removeOneCharacter} />
        <Form handleSubmit = {updateList}/>
      </div>
    );
    
  async function fetchAll(){
    try{
      const response = await axios.get('http://localhost:5000/users')
      return response.data.users_list;
    }
    catch (error){
      //we're not handling errors. just logging into the console
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person){
    try{
      const response = await axios.post('http://localhost:500/users', person);
      return response;
    }
    catch (error){
      console.log(error);
      return false;
    }
  }
  
  function updateList(person){
    makePostCall(person).then( result => {
      if(result && result.status === 201){
        setCharacters([...characters,person] );
      } 
    });
  }

  function removeOneCharacter (index){
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated);
  }

  /*function updateList(person){
    setCharacters([...characters, person]);
  }*/
}

useEffect(() => {
  fetchAll().then( result => {
    if (result){
      setCharacters(result);
    }
  });
}, []);


export default MyApp