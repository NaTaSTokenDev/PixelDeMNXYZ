import React from "react";

interface PixelDemnMetadata {
  series: string;
  name: string;
  link: string;
}

interface DeMNSelectProps {
  pixelDemnMetadata: PixelDemnMetadata[];
  selectedValue: string;
}

const MySelectedDeMN: React.FC<DeMNSelectProps> = ({
  pixelDemnMetadata,
  selectedValue,
}) => {
  // Check if pixelDemnMetadata is defined and an array
  if (!pixelDemnMetadata || !Array.isArray(pixelDemnMetadata)) {
    return null; 
  }
  
  const numericValue = parseInt(selectedValue.split(" ")[1]);
  const isGif = numericValue >= 101 && numericValue <= 141;
  const imagePath = `/images/PixelDeMNs/${selectedValue.replace(/#/g, '')}.${isGif ? 'gif' : 'png'}`;

  return (
    <div>
      <img
        src={imagePath}
        width="150"
        height="150"
        style={{ verticalAlign: "bottom" }}
        alt="Your Selected PixelDeMN"
      />
   </div>
  );
};

export default MySelectedDeMN;
