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
        <Table characterData={characters} removeCharacter = {removeOneCharacter} />*/
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
  async function makePostCall(user){
    try{
      const response = await axios.post('http://localhost:5000/users', user);
      return response;
    }
    catch (error){
      console.log(error);
      return false;
    }
  }

  // sending a delete request to backend, wait for success//
  async function makeDeleteCall(user){
    console.log(user);
    try{
      const response = await axios.delete('http://localhost:5000/users/'+ user._id);
      return response;
    }
    catch (error){
      console.log(error);
      return false;
    }
  }
  
  //only update list if request is successful (201 http status returned)//
  function updateList(user){
    makePostCall(user).then( result => {
      if(result && result.status === 201){
        setCharacters([...characters,result.data] );
      } 
    });
  }

  function removeOneCharacter (index){
    const user = characters[index];
    makeDeleteCall(user).then( result => {
      if(result && result.status === 204){
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
    })

  }

  /*function updateList(user){
    setCharacters([...characters, user]);
  }*/
}




export default MyApp