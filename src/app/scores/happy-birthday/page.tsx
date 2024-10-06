"use client";

import React from "react";
import OpenSheetMusicDisplay from "../../components/OpenSheetMusicDisplay";

const HappyBirthdayPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Partitura de &quot;Happy Birthday&quot;
      </h1>
      <OpenSheetMusicDisplay file="/scores/happy_birthday.mxl" />
    </div>
  );
};

export default HappyBirthdayPage;
