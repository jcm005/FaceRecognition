import React from 'react';
import './FaceReco.css'

const FaceReco = ({ imageUrl, bound }) => {

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img src={imageUrl} id='inputimage' width='500px' height='auto' src={imageUrl} />
                <div className='bounding-box' style={{ top: bound.topRow, right: bound.rightcol, bottom: bound.bottomrow, left: bound.leftcol }}></div>
            </div>

        </div>

    );
}

export default FaceReco;

