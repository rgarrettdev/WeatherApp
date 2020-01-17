import React from "react";
//stateless functional component.
const Form = props => (
    <form className="form-container_form" onSubmit={props.getWeather}> 
        <input type="text" name="city" placeholder="City/Town..."/>
        <input type="text" name="country" placeholder="Country..."/>
        <button>Get Weather</button>
    </form>
    );
export default Form;