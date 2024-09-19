
import './Darmod.css'

interface DarkmodProps {
  handle: (event: React.MouseEvent<HTMLInputElement>) => void; 
  
}

const Darkmod = ({handle}:DarkmodProps) => {

  return (
      <div className="check">
          <input type="checkbox" id="check" onClick={handle} />
          <label htmlFor="check"></label>

    </div>
  )
}

export default Darkmod