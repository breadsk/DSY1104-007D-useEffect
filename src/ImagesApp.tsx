import { useState } from 'react'

import { CustomHeader , SearchBar } from './sharedComponents'
import { PreviousSearches , ImagesList } from './imagesComponents'

import { getImagesByQuery } from './actions/get-images-by-query.actions'

import { robots , mockGifs } from './mock-data'

import './index.css'


export const ImagesApp = () => {

  const [ previousRobot , setPreviousRobot ]  = useState(['']);


  //Comunicación entre componentes
  const handleTermClicked = ( term:string ) => {
    console.log({term});    
  }
  
  const handleSearch = async( query:string ) => {

    //1 limpio el inicio y final de la query
    //ademas la dejo en minuscula
    query = query.trim().toLowerCase();

    //2 Si la query viene vacia cortamos la funcion
    if(query.length === 0) return;
    
    //3 Si lo que viene en la query ya esta en mi arreglo
    //de mi estado cortamos la funcion
    if(previousRobot.includes(query)) return;

    //4 en una constante cortamos las primeras 8 posiciones
    // siempre de un arreglo para mostrar siempre las 8 primeras
    // const currentRobots = previousRobot.slice(0,7)
    // currentRobots.unshift(query)
    // setPreviousRobot(currentRobots)

    //spread operator 
    setPreviousRobot([query, ...previousRobot].splice(0,7))

    //obj2 = obj1
    await getImagesByQuery(query)

    console.log(query);    
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
        
        <ImagesList robots={robots} />
        
        
    </>
  )
}
