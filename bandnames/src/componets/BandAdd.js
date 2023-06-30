
import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

const BandAdd = () => {
  const { socket } = useContext( SocketContext );
  const [newBand, setNewBand] = useState('');

  const onSubmit = (e) => { 
    e.preventDefault();
    if( newBand.trim().length > 0){
      socket.emit('add-band', newBand );
    }
    setNewBand('');
   }

  return (
    <>
        <h3>Agregar Banda</h3>

        <form onSubmit={ onSubmit }>
            <input
                className='form-control'
                placeholder='Nuevo nombre de banda'
                value={ newBand }
                onChange={ (e) => setNewBand(e.target.value) }
            />
        </form>
    </>
  )
}

export default BandAdd