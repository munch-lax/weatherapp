import React from 'react'
import './Css/DetailsBlock.css'


const DetailsBlock = (props) => {

    var max=Math.round(props.temp.max)
    var min=Math.round(props.temp.min)
    if (props.flag==='hour'){
        var day=new Date(props.dt*1000).toLocaleTimeString()
    }
    else{
        var day=new Date(props.dt*1000).toDateString()
    }

    
    
    
    
    return (
        <div className='detailsContainer'>
            <p className='item'>{day.slice(0,11)}</p>
            <img src={`http://openweathermap.org/img/wn/${props.icon}.png`} className="animate" style={{marginRight:'50px',color:'grey',height:70}} />
            <p className='item' >{props.temp.max?max+'/'+min:props.temp+'°'}</p>
            <p className='item'>{props.description}</p>
            
        </div>
    )
}

export default DetailsBlock
