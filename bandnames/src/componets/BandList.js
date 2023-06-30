import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

const BandList = () => {

    const { socket } = useContext( SocketContext );
    const [bands, setBands] = useState([]);

    useEffect(() => {    
        socket.on('current-bands', (data) => { 
            setBands(data);
            });

        return () => socket.off('current-bands');
    }, [socket])
    
    const votes = (id) => { 
        socket.emit('vote-band', id);
    }
    
    const deleteBand = (id) => { 
        socket.emit('delete-band', id);
    }
  
    const changeBandName = (event, id) => { 
        const newName = event.target.value;
        setBands((bands) => bands.map((band) => { 
            if (band.id === id) {
                band.name = newName;
            }
            return band;
        }));
    }

    const onblurBandName = (id, name) => socket.emit('change-name', { id, name });

     const handleKeyDown = (event, id, name) => {
        if (event.key === 'Enter') {
            socket.emit('change-name', { id, name });
        }
      };


  const crearRows = () => { 
    return (
        bands.map(band => (
            <tr key={band.id}>
                <td>
                    <button className='btn btn-primary' onClick={() => votes( band.id )}>+1</button>
                </td>
                <td>
                    <input 
                        className='form-control' 
                        value={ band.name} 
                        onChange={(event) => changeBandName(event, band.id)} 
                        onBlur={ () => onblurBandName(band.id, band.name)}
                        onKeyDown={ (event) => handleKeyDown(event, band.id, band.name) }
                        />
                </td>
                <td>
                    <h3>{band.votes}</h3>
                </td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteBand( band.id )}>Borrar</button>
                </td>
            </tr>
        ))
    );
   }
  return (
    <>
        <h3>Bandas actuales</h3>

        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombres</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {crearRows()}
            </tbody>
        </table>
    </>
  )
}

export default BandList