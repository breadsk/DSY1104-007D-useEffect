import { 
    useLocation , 
    useNavigate } from "react-router-dom";

import type { robotsProps } from "../interfaces/images.interfaces";

export const RobotComponent = () => {

  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener un solo robot
  const { robot } = location.state as { robot: robotsProps } || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!robot) {
    return (
      <div className="robot-container">
        <button onClick={handleGoBack} className="back-button">
          Volver
        </button>
        <div className="error-message">
          No se encontraron datos del robot
        </div>
      </div>
    );
  }

  return (
    <div className="robot-container">
      <button 
        onClick={ handleGoBack }>        
        Volver
      </button>

      <div className="robot-detail">
        <img 
          src={robot.avatar} 
          alt={robot.name}
          className="robot-detail-image"
        />
        <div className="robot-detail-info">
          <h1 className="montserrat-bold">{robot.name}</h1>
          <p className="robot-id montserrat-light">ID: {robot.id}</p>
          <p className="robot-id montserrat-light">Nombre: {robot.name}</p>
          <p className="robot-id montserrat-light">Weapon: {robot.weapon}</p>
          {/* Agrega más detalles específicos del robot aquí */}
        </div>
      </div>
    </div>
  );
};