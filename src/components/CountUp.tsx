import { useEffect, useRef, useState } from 'react';import { useEffect, useRef, useState } from 'react';



export default function CountUp({export default function CountUp({

  to,  to,

  from = 0,  from = 0,

  duration = 1.5,  duration = 1.5,

  className = '',  className = '',

  formatter,  formatter,

}: {}: {

  to: number;  to: number;

  from?: number;  from?: number;

  duration?: number;  duration?: number;

  className?: string;  className?: string;

  formatter?: (value: number) => string;  formatter?: (value: number) => string;

}) {}) {

  const [count, setCount] = useState(from);  const [count, setCount] = useState(from);

  const [hasAnimated, setHasAnimated] = useState(false);  const [hasAnimated, setHasAnimated] = useState(false);

  const ref = useRef<HTMLSpanElement>(null);  const ref = useRef<HTMLSpanElement>(null);



  useEffect(() => {  useEffect(() => {

    // Check if already animated in this session    // Check if already animated in this session

    const sessionKey = `countup-${to}-${from}`;    const sessionKey = `countup-${to}-${from}`;

    if (sessionStorage.getItem(sessionKey) || hasAnimated) {    if (sessionStorage.getItem(sessionKey) || hasAnimated) {

      setCount(to);      setCount(to);

      return;      return;

    }    }



    // CSS-based counting animation    // CSS-based counting animation

    const increment = (to - from) / (duration * 60); // 60fps    const increment = (to - from) / (duration * 60); // 60fps

    let current = from;    let current = from;

    const timer = setInterval(() => {    const timer = setInterval(() => {

      current += increment;      current += increment;

      if (current >= to) {      if (current >= to) {

        current = to;        current = to;

        clearInterval(timer);        clearInterval(timer);

        sessionStorage.setItem(sessionKey, 'true');        sessionStorage.setItem(sessionKey, 'true');

        setHasAnimated(true);        setHasAnimated(true);

      }      }

      setCount(current);      setCount(current);

    }, 1000 / 60);    }, 1000 / 60);



    return () => clearInterval(timer);    return () => clearInterval(timer);

  }, [to, from, duration, hasAnimated]);  }, [to, from, duration, hasAnimated]);



  const displayValue = formatter ? formatter(count) : count.toFixed(2);  const displayValue = formatter ? formatter(count) : count.toFixed(2);



  return (  return (

    <span ref={ref} className={className}>    <span ref={ref} className={className}>

      {displayValue}      {displayValue}

    </span>    </span>

  );  );

}}
