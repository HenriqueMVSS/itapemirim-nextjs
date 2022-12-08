import { AiFillHome } from "react-icons/ai";

export function HomeIcon(){

    return(
        <div className="home-icon">
           <div className="home">
            <AiFillHome size={20} title="Home"/>
           </div>
            <style jsx>{`

                .home-icon {
                   
                    color:#000;
                   
                    padding:4px 8px;

                }  

                @media(max-width: 600px) {
                    .home-icon {
                   
                        color:rgb(241,210,16);
                  
                        padding:4px 8px;

                    }  
                }


                @media(max-height: 600px) {
                    .home-icon {
                   
                        color:rgb(241,210,16);
                    
                        padding:4px 8px;

                    }  
                }


                
            `}</style>
        </div>   
    )
}