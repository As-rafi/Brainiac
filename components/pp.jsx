import img from "./images/sbk2.jfif"

export default function PP ( ) {

    return ( 
           <div className=" p-4 d-flex ms-2 "  style={{float:"left" ,    width:'46vw' , marginTop:'10px' }}>
                        
                        
                           <a href="#">
                          <img src={img} className="rounded " 
                             style={{width:'7vw',  transition: 'transform 0.3s ease-in-out',overflow:'hidden' }}  
                              
                              alt="#"
                           />   
                            </a>
               
                            <div className=" " style={{ marginLeft:'13px',position:'relative', top:'5px'}}>
               
                               <p className="" style={{fontSize:'1.2vw' , position : 'relative' , top:'2px' , color:'#333' , opacity:0.93, cursor:'pointer' }} >  How Cricket gained popularity in the competitive sports market in USA     </p>
                              
                              <div className="d-flex w-75 justify-content-between " style={{position:'relative' , top: '-6px'}} >
               
                                  <p style={{fontSize:'1vw' , color:'#ff6600' , opacity:0.8 , fontWeight:500}}> Geopolitics</p>
                                  
                                  <button className=" text-light" style={{backgroundColor:'#ff6600', fontSize:'1vw',border:'none', fontWeight:400 , padding:'0px', width:'6vw', height:'2.2vw' , position:'relative' , top:'-5px', borderRadius:'4px'   }}>Read Blog</button>
                              </div>
                            </div>
                                <br/>
                                
                       </div>
    )
}