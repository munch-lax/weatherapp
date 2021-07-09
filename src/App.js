
import { useState } from 'react';
import { Mydiv } from './Components/Css/Toggle';
import WeatherCard from './Components/WeatherCard';



function App() {
  const [toggle, settoggle] = useState(false)
  
  return (
    <Mydiv primary={toggle}>
      <div className='flexContainer'>
      <button onClick={e=>{settoggle(!toggle)}}>Change mode</button>
      <WeatherCard/>
      </div>
    </Mydiv>
  );
}

export default App;
