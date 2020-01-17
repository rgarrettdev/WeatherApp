import React, {Component} from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
//This is the main app.
//Can only have one parent element "<div>".

const API_KEY = `${process.env.REACT_APP_API_KEY}`;
//Class is only necessary if there is state information.
class App extends Component {
  //state is an object that contains keyvaluepairs.
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => { //arrow function, allows 'this' to be used independently.
    e.preventDefault(); //Prevents refreshing the page
    const city = e.target.elements.city.value; 
    const country = e.target.elements.country.value; //Grabs values for city and country from form component.
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`); //Api call.
    const data = await api_call.json(); //convert api call to json assingn to data.
    if(city && country){ //checks for user input before setting state.
      console.log(data);
      //sets the keyvaluepairs with info from api.
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a location such as (London GB)."
      })
    }
  }
  //setup prop getWeather to the value of the function getWeather.
  render() {
    return (
      <div> 
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-5 title-container">
                </div>
                <div className="col-lg-7 form-container">
                  <Titles />
                  <Form getWeather={this.getWeather}/>  
                  <Weather 
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } //components for webpage.
}

export default App;