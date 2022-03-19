import React from "react";
import dynamic from "next/dynamic";

const HomePage: React.FC = () => {
  const Map = dynamic(() => import("../components/Map"), { ssr: false });

  return (
    <>
      <Map />
    </>
  );
};

export default HomePage;
