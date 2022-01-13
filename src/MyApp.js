import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'


function MyApp() {
  const [characters, setCharacters] = useState([]);

  //hook called only when MyApp first mounts//
  useEffect(() => {
    fetchAll().then( result => {
      if (result){
        setCharacters(result);
      }
    });
  }, []);

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter = {removeOneCharacter} />
        <Form handleSubmit = {updateList}/>
      </div>
    );

  //fetching character list from backend//  
  async function fetchAll(){
    try{
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch (error){
      //we're not handling errors. just logging into the console
      console.log(error);
      return false;
    }
  }

  // sending a post request to backend, wait for success//
  async function makePostCall(person){
    try{
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
    }
    catch (error){
      console.log(error);
      return false;
    }
  }
  
  //only update list if request is successful (201 http status returned)//
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




export default MyApp