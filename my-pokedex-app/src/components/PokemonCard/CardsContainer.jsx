import React from "react";
/* plassering for children komponenten*/ 
function CardsContainer({ children }) {
  return ( 
    <div
      className="container mx-auto
    
    flex flex-wrap justify-between gap-4 md:gap-8 lg:gap-10 xl:gap-12 2xl:
    align-center
     gap-14 "
    >
      {children}
    </div>
  );
}

export default CardsContainer;
