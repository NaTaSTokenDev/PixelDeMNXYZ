interface PixelDemnMetadata {
  series: string;
  name: string;
  link: string;
}

interface DeMNSelectProps {
  pixelDemnMetadata: PixelDemnMetadata[];
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}
const DeMNSelect: React.FC<DeMNSelectProps> = ({
  pixelDemnMetadata,
  selectedValue,
  setSelectedValue,
}) => {
  
  if (!pixelDemnMetadata || !Array.isArray(pixelDemnMetadata)) {
    return null; 
  }
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <select
        className="inputfield"
        name="demn"
        id="demn"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="selectapixeldemn">Select a PixelDeMN</option>
        {/* Map over the pixelDemnMetadata array to generate <option> elements */}
        {pixelDemnMetadata.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name} {/* Show the 'name' property as the option text */}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default DeMNSelect;
