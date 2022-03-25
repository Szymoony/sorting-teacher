// Credit: https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
import React, { useState, useImperativeHandle } from 'react';
import Timer from '../Timer/Timer';

const stopwatchStyle = {
  backgroundColor: '#0d0c1b',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const StopWatch = React.forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(props.defaultactive);
  const [time, setTime] = useState(props.defaulttime);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  useImperativeHandle(ref, () => ({
    handleReset: () => {
      setIsActive(false);
      return time;
    },
    getTime: () => {
      return time;
    }
  }));

  return (
    <div style={stopwatchStyle}>
      <Timer time={time} />
    </div>
  );
});

export default StopWatch;
