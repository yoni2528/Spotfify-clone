import React from 'react';
import { Link } from 'react-router-dom';

const LongTrackCard: React.FC<{ name: string; image: string; id: string }> = ({ name, image, id }) => {
  return (
    <div className="flex gap-4 bg-[#323232] hover:bg-[#444] transition-all duration-500 rounded-lg overflow-hidden">
      <Link to={`/artist/${id}`} className="flex gap-6">
        <div style={{ backgroundImage: `url(${image})` }} className={`bg-cover bg-center w-24 h-24`}></div>
        <div className="self-center">
          <h3 className="font-medium text-lg">{name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default LongTrackCard;
