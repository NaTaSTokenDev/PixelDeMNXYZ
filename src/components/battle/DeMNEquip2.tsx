interface IDemnSelectProps {
  combinedData: Array<string | { key: string, value: string }>
}

const DeMNEquip2 = ({ combinedData}: IDemnSelectProps) => {
  
  return (
    <select className="inputfield" name="demn" id="demn">
      
        <option>
          No Equipment
        </option>
          </select>
  )
};

export default DeMNEquip2;

