import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import BandAdd from '../componets/BandAdd';
import BandList from '../componets/BandList';
import { BandChart } from '../componets/BandChart';


function HomePage() {

  const { online } = useContext( SocketContext );

  // /* Dado un array de enteros no ordenado llamadi nums,
  // devuelve el entero positivo mas pequeno que falte. */
  // const smallestMissingPositive = (nums) => { 
  //   if(nums.length === 0) return 1;

  //   // solo numeros positivos
  //   const onlyPositives = nums.filter(num => num > 0);
  //   console.log('solo positivos',onlyPositives)
  //   // quitar numeros repetidos
  //   const set = new Set(onlyPositives);
  //   console.log('quitar repetidos',set)
  //   // buscamos el primer positivo que no esta
  //   for (let i = 1; i <= set.size + 1; i++) {
  //     if(!set.has(i)) return i;
  //   }
  //  }

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online?
            <span className="text-success">&nbsp;Online</span>
            :<span className="text-danger">&nbsp;Offline</span>
        }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr/>

      <div className='row'>
        <div className='col'>
          <BandChart />
        </div>
      </div>
      <hr/>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
