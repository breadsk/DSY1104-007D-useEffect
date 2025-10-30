import { 
    useCallback,
    useEffect, 
    useState } from 'react'

import { CustomHeader , SearchBar } from './sharedComponents'
import { PreviousSearches , ImagesList } from './imagesComponents'

import { getImages , getImagesByQuery } from './actions';

import { updateArray } from './helpers'

import type { robotsProps } from './interfaces/images.interfaces'

import './index.css'

export const ImagesApp = () => {

  const [ robots , setRobots ] = useState<robotsProps[]>([]);
  const [ allRobots , setAllRobots ] = useState<robotsProps[]>([]);
  const [ previousRobot , setPreviousRobot ]  = useState<string[]>([]);

  
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
  
  const handleSearch = useCallback(async( query:string ) => {
   
    query = query.trim().toLowerCase();
    
    if(query.length === 0){
      setRobots(allRobots);
      return;
    }
      
    setPreviousRobot(( prev ) => updateArray(prev,query))

    try {

      const searchRobotResult = await getImagesByQuery(query);
      if(searchRobotResult.robot){
        setRobots([searchRobotResult.robot]);
      }
      return;

    }catch(error){
      setRobots(allRobots);
    }
    
  },[ allRobots ]);

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

// El Problema
// Cada vez que tu componente ImagesApp se re-renderiza, se crea una nueva instancia de la función handleSearch. Esto pasa porque:

//1. Cambios de estado: Cuando setRobots, setAllRobots o setPreviousRobot se ejecutan, el componente se re-renderiza

//2. Nueva función: En cada re-render, handleSearch se recrea como una función completamente nueva

//3. Prop drilling: Si pasas handleSearch a componentes hijos, ellos detectan el cambio y también se re-renderizan