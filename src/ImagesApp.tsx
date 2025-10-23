import { useEffect, useState } from 'react'

import { CustomHeader , SearchBar } from './sharedComponents'
import { PreviousSearches , ImagesList } from './imagesComponents'

import { getImagesByQuery } from './actions/get-images-by-query.actions'

import './index.css'
import { getImages } from './actions/get-images.actions'

import type { robotsProps } from './interfaces/images.interfaces'


export const ImagesApp = () => {

  const [ images , setImages ] = useState<robotsProps[]>([]);
  const [ previousRobot , setPreviousRobot ]  = useState(['']);

  getImages();
  useEffect(()=> {
    const fetchData = async() => {
      try {
         const data = await getImages();
         const robots = data.robots;
         setImages(robots);
       }
       catch(error){
        console.error("Error en fetchin data", error);
       }
      }
      
    fetchData();
  },[])

  //Comunicación entre componentes
  const handleTermClicked = ( term:string ) => {
    console.log({term});    
  }
  
  const handleSearch = async( query:string ) => {
   
    query = query.trim().toLowerCase();

    //2 Si la query viene vacia cortamos la funcion
    if(query.length === 0) return;
        
    if(previousRobot.includes(query)) return;


    setPreviousRobot([query, ...previousRobot].splice(0,7))
    
    console.log(query);

    const data = await getImagesByQuery(query)
    console.log(data);
    
  }

  return (
    <>        
        <CustomHeader 
            title="Buscador de imagenes"
            text="Bienvenidos a nuestra aplicacion de búsqueda de imagenes"
            />

        <SearchBar 
            placeHolder="Ingrese nombre de la imagen" 
            onQuery = { handleSearch }
            />

        <PreviousSearches 
            searches={ previousRobot }
            onLabelClicked = { handleTermClicked }
            />
        
        <ImagesList robots={ images } />
        
        
    </>
  )
}
