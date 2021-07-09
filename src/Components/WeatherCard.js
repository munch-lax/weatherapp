import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Css/WeatherCard.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DetailsBlock from './DetailsBlock';

const WeatherCard = () => {
    var baseURL='https://api.openweathermap.org/data/2.5/'
    
    const [data, setdata] = useState({})
    const [City, setCity] = useState('')
    

    
    useEffect(() => {

        if (City.length>1){

            const response = axios.get(baseURL+'weather',{
                params:{
                    q:City,
                    appid:'e0b05df8e2a5970631d5016187b04a71',
                    units:'metric'
                }
            }
            ).then(data=>{
                
                axios.get('https://api.openweathermap.org/data/2.5/onecall',{
                    params:{
                        
                        lat:data.data.coord.lat,
                        lon:data.data.coord.lon,
                        appid:'e0b05df8e2a5970631d5016187b04a71',
                        units:'metric'
    
                    }
                }).then(data2=>{
                    
                    setdata({
                        currenttemp:data2.data.current.temp,
                        humidity : data2.data.current.humidity,
                        main:data2.data.current.weather[0],
                        daily:data2.data.daily,
                        hourly:data2.data.hourly
                    })
                })
                
                
            }).catch(error=>{
                setdata({})
                
            })
            





        }





        if(City.length<1){
            navigator.geolocation.getCurrentPosition(position=>{

                axios.get(baseURL+'onecall',{
                    params:{
                        lat:position.coords.latitude,
                        lon:position.coords.longitude,
                        appid:'e0b05df8e2a5970631d5016187b04a71',
                        units:'metric'

                    }
                }).then(data2=>{
                    setdata({
                        currenttemp:data2.data.current.temp,
                        humidity : data2.data.current.humidity,
                        main:data2.data.current.weather[0],
                        daily:data2.data.daily,
                        hourly:data2.data.hourly,
                        
                    })
                })

            })
        }

        

        

        
    }, [City])

    
    
    const renderIcon=()=>{
        
        
        if(data.main){
            
            
            return(<img 
                src={`http://openweathermap.org/img/wn/${data.main.icon}.png`} 
                className="animate" 
                style={{marginRight:'50px',color:'grey',height:70}} 
                />)
            
        

    }
    }
    

    
    

    
    return (

        
        <div className='container'>
            {data.hourly?
                <ul style={{listStyleType:'none'}}>
                
                <li>
                    <input className='location' type='text' value={City} onChange={e=>{setCity(e.target.value)}} placeholder="Enter any city"/><LocationOnIcon/>
                </li>
                
                <li>
                    <div className='font-check'>
                    {renderIcon()}
                    {data.currenttemp}°
                    </div>
                </li>
                <li>
                    <div className='temp'>
                        {data.main?data.main.description + ' in ':null}
                       {City.length>1?City:'Current location'} 
                    </div>
                </li>
                <li>
                    <p>48 hour forecast</p>
                <div className='overflowContainer' id='style-4'>
                   {
                       data.currenttemp ? data.hourly.map(value=>{
                           
                        return(
                        
                            <DetailsBlock 
                            icon={value.weather[0].icon} 
                            temp={value.temp} 
                            description={value.weather[0].description} 
                            dt={value.dt}
                            flag='hour'
                            

                            />
                         
                         )
                    }):null
                   }
                </div>

                </li>
                <li>
                <p>8 Day forecast</p>
                <div className='overflowContainer' id='style-4' style={{float:'left'}}>
                   {
                       data.currenttemp ? data.daily.map(value=>{
                           
                        return(
                        
                            <DetailsBlock 
                            icon={value.weather[0].icon} 
                            temp={value.temp} 
                            description={value.weather[0].description} 
                            dt={value.dt}
                            />
                         
                         )
                    }):null
                   }
                </div>
                </li>
                
               
            </ul>
            
            
            
            
            
            
            
            
            
            :<div> 
                <input className='location' type='text' value={City} onChange={e=>{setCity(e.target.value)}} placeholder="Enter any city"/><LocationOnIcon/> 
                <h3>Please enter a City</h3>
            </div>}


            
        </div>
    )
}

export default WeatherCard
