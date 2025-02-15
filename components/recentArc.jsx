import img from "./images/poli1.jfif";

export default function RecArc ( ) {

    return (
       <div className=" p-4 d-flex ms-2 "  style={{float:"left" ,    width:'46vw' , marginTop:'2vw' }}>
                
                
                   <a href="#">
                  <img src={img} className="rounded " 
                     style={{width:'9vw',  transition: 'transform 0.3s ease-in-out',overflow:'hidden' }}  
                      
                      alt="#"
                   />   
                    </a>
       
                    <div className=" " style={{ marginLeft:'15px',position:'relative', top:'5px'}}>
       
                       <p className="" style={{fontSize:'1.25vw' , position : 'relative' , top:'2px' , color:'#333' ,fontWeight:400, opacity:0.93, cursor:'pointer' }} > Top Geopolitical giants that will be dominate power of world in 2025    </p>
                      
                      <div className="d-flex w-75 justify-content-between " style={{position:'relative' , top: '-8px'}} >
       
                          <p style={{fontSize:'1.1vw' , color:'#ff6600' , opacity:0.8 , fontWeight:500}}> Geopolitics</p>
                          
                          <button className=" text-light" style={{backgroundColor:'#ff6600', fontSize:'1.1vw',border:'none', fontWeight:400 , padding:'0px', width:'7vw', height:'2.4vw' , position:'relative' , top:'-3px', borderRadius:'4px'   }}>Read Blog</button>
                      </div>
                    </div>
                        <br/>
                        
               </div>
    )
}