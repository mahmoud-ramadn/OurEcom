


const Heading = ({title}:{title:string}) => {
  return (
      <h1 className="mb-3" style={{fontSize:'26px'}}>
        {title.toLocaleUpperCase()}
    </h1>
  )
}

export default Heading