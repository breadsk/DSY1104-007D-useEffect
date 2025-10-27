import { useEffect, useState } from 'react'

import { CustomHeader , SearchBar } from './sharedComponents'
import { PreviousSearches , ImagesList } from './imagesComponents'

import { getImages , getImagesByQuery } from './actions';

import type { robotsProps } from './interfaces/images.interfaces'

import './index.css'

export const ImagesApp = () => {

  const [ robots , setRobots ] = useState<robotsProps[]>([]);
  const [ allRobots , setAllRobots ] = useState<robotsProps[]>([]);
  const [ previousRobot , setPreviousRobot ]  = useState<string[]>([]);

  getImages();
  useEffect(()=> {
    const fetchData = async() => {
      try {
         const data = await getImages();
         const robots = data.robots;
         setRobots(robots);
         setAllRobots(robots);
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

    
    if(query.length === 0){
      setRobots(allRobots);
      return;
    }
      
    setPreviousRobot(( prevSearches ) => {
      if(prevSearches[0] === query) return prevSearches;

      const filteredSearches = prevSearches.filter(( termino ) => {
        return termino.toLocaleLowerCase() !== query;
      });

      const updateSearches = [query, ...filteredSearches].slice(0,7);

      return updateSearches;
    })

    try {

      const searchRobotResult = await getImagesByQuery(query);
      if(searchRobotResult.robot){
        setRobots([searchRobotResult.robot]);
      }
      return;

    }catch(error){
      setRobots(allRobots);
    }
    
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
        
        <ImagesList robots={ robots } />
        
        
    </>
  )
}
