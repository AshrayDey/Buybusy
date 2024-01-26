
import Spinner from 'react-spinner-material';

export const Loader=()=> {

  return (
      <div style={{textAlign:"center",
                    display:"flex", 
                    justifyContent:"space-around",
                    flexDirection:"column",
                    alignItems:"center",
                    marginTop:"15%",
                    zIndex:"999"}}>
        <div>
          <Spinner radius={80} color={"blue"} stroke={2} visible={true} />
          <h4>Loading..</h4>
        </div>
      </div>
    )
}