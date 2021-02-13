import React from 'react';
import './imageLink.css'

const imageLink = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p style={{ fontFamily: 'georgia' }} className='f3'>
                {'Enter an image url of a face to be detected!'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} />
                    <button style={{ background: 'lightblack' }}
                        className='w-30 grow f4 link ph3 pv2 dib Black '
                        onClick={onSubmit}
                    >Detect</button>
                </div>
            </div>
        </div >
    );
}


export default imageLink;