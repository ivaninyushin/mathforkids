import React from 'react';
import './fireworks.scss';

type FireworksProps = {};

const Fireworks: React.FC<FireworksProps> = () => (
  <div className="fireworksPlaceholder">
    <div className="pyro">
      <div className="before"></div>
      <div className="after"></div>
    </div>
  </div>
);

export default Fireworks;
