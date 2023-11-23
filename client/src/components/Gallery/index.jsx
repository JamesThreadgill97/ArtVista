import React, {useEffect} from 'react'
import ArtworkCard from "../ArtworkCard"

export default function Gallery({artworks}) {

  useEffect(() => {
    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);

    // Clean up the event listener on component unmount
    return () => {
        window.removeEventListener('contextmenu', handleContextMenu);
    };
}, []);


  return (
    <div className='gallery'>
      {artworks.map((el,i)=><ArtworkCard id={el.id} title={el.title} url={el.url} key={i}/>)}
    </div>
  )
}


