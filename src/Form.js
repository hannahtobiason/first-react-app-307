import React, {useState} from 'react';

function Form(props){
    const [user, setPerson] = useState(
        {
            username: "",
            password: "",
        }
    );
    function handleChange(event){
        const {name, value} = event.target;
        if (name === "password")
            setPerson(
                {username: user['username'], password: value}
            );
        else
            setPerson(
                {username: value, password: user['password']}
            );
    }

    function submitForm(){
        props.handleSubmit(user);
        setPerson({username: '', password: ''});
    }
    return(
        <form>
            <label htmlFor = "username">Username</label>
            <input
                type = "text"
                name = "username"
                id = "username"
                value = {user.username}
                onChange = {handleChange}/>
            <label htmlFor = "password">Password</label>
            <input
                type = "text"
                name = "password"
                id = "password"
                value = {user.password}
                onChange = {handleChange}/>

            <input type = "button" value = "Login" onClick = {submitForm}/>
        </form>
    );
}

export default Form;