import Link from "next/link"
import { HomeIcon } from "./HomeIcon";
import { ContactIcon } from "./ContactIcon";
import { useSession } from "next-auth/react";

const pathContact = `/contact`

export function FooterMobile(){
    const { status } = useSession();  
    return (
       <> 
        <div className="footer">
           <div className="footer-items">
            <div className="content" ><Link href="/"><HomeIcon/></Link></div>
            {status === "authenticated" && (
            <div className="content"><Link href={pathContact}><ContactIcon/></Link></div>
            )}
           </div> 
            
        </div>

        <style jsx>{`

            .footer-items {
                background: rgba(4,4,2,0.9);
                border-top: 1px solid #ccc;
                padding: 0 8px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                bottom: 0;
                left:0;
                width: 100%;
                position: relative;
                margin-top: 5px;
            }   

            .content {
                padding: 8px;
                
            }

            a{
                font-weight: bold;
                text-decoration: none;
                color: #ffde00;
            }
        `}</style>
       </> 
    )
}