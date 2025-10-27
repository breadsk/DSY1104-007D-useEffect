import { useNavigate } from 'react-router-dom';
import type { robotsProps } from '../interfaces/images.interfaces'

interface Props {
    robots:robotsProps[]
}


export const ImagesList = ({ robots }:Props) => {

  const navigate = useNavigate();  
    
  const robotsArray = Array.isArray(robots) ? robots : [robots];

  const handleShowRobot = (robot:robotsProps) => {
    navigate('/robot-component',{
        state: {
            robot: robot
        }
    });
  }

  return (
    <div className="gifs-container">
        {
            robotsArray.map( ( robot )=> {
                return (
                    <div key={ robot.id } className="gif-card">
                        <img
                            onClick={() => {
                                handleShowRobot(robot)
                            } } 
                            src={robot.avatar} 
                            alt={ robot.name } />
                        <h3>{ robot.name }</h3>
                    </div>
                )
            })
        }
    </div>
  )
}
