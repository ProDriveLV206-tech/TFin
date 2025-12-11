import React from 'react';
export default function GameLoader({ name, height=480 }){
  if(!name) return <div>No game selected</div>;
  const src = `/src/games/${name}/index.html`;
  return <div style={{borderRadius:8,overflow:'hidden',border:'1px solid var(--border)'}}><iframe src={src} title={name} style={{width:'100%',height}}/></div>;
}
