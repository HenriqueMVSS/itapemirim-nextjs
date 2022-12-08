import { RiContactsLine } from "react-icons/ri";

export function ContactIcon(){

    return(
        <div className="contact-icon">
           <div className="contact">
            <RiContactsLine size={23} title="Contato"/>
           </div>
            <style jsx>{`

                .contact-icon {
                   
                    color:#000;
                   
                    padding:4px 8px;

                }  

                @media(max-width: 600px) {
                    .contact-icon {
                   
                        color:rgb(241,210,16);
                  
                        padding:4px 8px;

                    }  
                }


                @media(max-height: 600px) {
                    .contact-icon {
                   
                        color:rgb(241,210,16);
                    
                        padding:4px 8px;

                    }  
                }


                
            `}</style>
        </div>   
    )
}