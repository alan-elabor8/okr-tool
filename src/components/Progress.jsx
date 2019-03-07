import React from 'react';


function Progress(props) {

    return(
        <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#dadada',
          borderRadius: '2px'
        }}
      >
        <div
          style={{
            width: `${props.value}%`,
            height: '100%',
            backgroundColor: props.value > 66 ? '#85cc00'
              : props.value > 33 ? '#ffbf00'
              : '#ff2e00',
            borderRadius: '2px',
            transition: 'all .2s ease-out'
          }}
        />
      </div>
    )
}

export default Progress;