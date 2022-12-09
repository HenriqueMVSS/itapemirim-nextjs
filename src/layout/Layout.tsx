import { Footer } from "../components/Footer";
import { FooterMobile } from "../components/FooterMobile";
import { Appbar } from "./Appbar";

export interface LayoutProps {
    children: React.ReactNode;
}

export function Layout(props : LayoutProps){
    return(   
    <>
       <nav>
        <Appbar />
       </nav>
       <main className="content">
         {props.children}
       </main>
       {/* <footer className="footer">
            <Footer/>
        </footer> */}
        {/* <footer className="footer-mobile">
            <FooterMobile />
        </footer> */}


        <style jsx>{`

        .content {
            margin: auto;
            max-width: 980px;
        }

        .footer-mobile {
            display:none;
        }

        @media(max-width: 600px){

            .footer {
                display: none;
            }

            .footer-mobile {
              display:block;
            }

        }

        @media(max-height: 600px){

            .footer {
                display: none;
            }

            .footer-mobile {
              display:block;
            }

            }
       `}</style>
    </>
     
    )
}