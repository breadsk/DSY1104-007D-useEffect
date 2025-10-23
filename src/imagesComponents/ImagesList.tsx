import type { robotsProps } from '../interfaces/images.interfaces'

interface Props {
    robots:robotsProps[]
}


export const ImagesList = ({ robots }:Props) => {

    console.log(robots);

  return (
    <div className="gifs-container">
        {
            robots.map( ( robot )=> {
                return (
                    <div key={ robot.id } className="gif-card">
                        <img src={robot.avatar} alt={ robot.name } />
                        <h3>{ robot.name }</h3>
                    </div>
                )
            } )
        }
    </div>
  )
}
