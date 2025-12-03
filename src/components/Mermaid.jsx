import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';


export default function Mermaid({ chart }) {
const ref = useRef(null);


useEffect(() => {
if (!chart) return;
// initialize mermaid each time
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });


try {
const id = 'm_' + Math.random().toString(36).substr(2, 9);
const el = document.createElement('div');
el.className = 'mermaid';
el.id = id;
el.innerHTML = chart;


if (ref.current) {
ref.current.innerHTML = '';
ref.current.appendChild(el);
mermaid.run({ querySelector: `#${id}` });
}
} catch (e) {
console.error('Mermaid render error', e);
}
}, [chart]);


return <div ref={ref} />;
}