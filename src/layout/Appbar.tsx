import React from "react";
import { ItaLogo } from "../components/ItaLogo";
import Link from "next/link";
import { HomeIcon } from "../components/HomeIcon";
import { ContactIcon } from '../components/ContactIcon';
import { GrLogout, GrLogin } from "react-icons/gr";
import { FaCashRegister } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const pathContact = `/contact`

export function Appbar(){
    const { data, status } = useSession();
    return (
       <>      
            <div className="app-bar">
                <div className="content-bar">
                    <div className="logo">
                        <div className="ita-logo">
                            <ItaLogo />
                        </div>
                        <h1 className="title-bar">Itapemirim</h1>
                    </div>
                  
                    <div className="row">
                       <Link href={__dirname}><HomeIcon/></Link> 
                    </div>
                                
                {status === "authenticated" && (
                    <>
                     <a className="contact" href={pathContact} title="Contato">
                        <ContactIcon aria-label="Contato" />
                     </a>
                     <div className="register-login">
                       
                        <a
                        href="/api/auth/signout"
                        className="item"
                        title="Sair"
                        onClick={(event) => {
                            event.preventDefault();
                            signOut();
                        }}
                        >
                        <GrLogout size="22px" aria-label="Sair" />
                        </a>
                        
                    </div>
                  </>
                )}
                {status === "unauthenticated" && (
                   <>
                    <div className="register-login">
                            <a className="item" href="/signup" title="Criar conta">
                            <FaCashRegister size="22px" aria-label="Entrar" />
                            </a>
                    
                            <a className="item" href="/api/auth/signin" title="Entrar">
                            <GrLogin size="22px" aria-label="Entrar" />
                            </a>
                    </div>
                   </> 
                )}
                </div>
            </div>

                <style jsx>{`
                    .app-bar{
                        width:100%;
                        background: rgb(241,210,16);
                        background: linear-gradient(90deg, rgba(255,222,0,255) 50%, rgba(255,222,0,255) 86%);
                        border-bottom: 2px solid #000;
                        position: fixed;
                        top: 0;
                        left: 0;
                        padding: 0 8px;
                        box-sizing: border-box;
                        z-index: 1;
                    }

                    .register-login a{
                        padding-right: 15px;
                    }

                    .content-bar {
                        margin: auto;
                        max-width: 980px;
                        height: 70px;
                        display:flex;
                        align-items:center;    
                        justify-content: center;           
                    }

                    .logo {
                        display:flex;
                        flex:1;
                    }

                    .ita-logo{
                        margin-top: 6px;
                    }

                    .title-bar {
                        font-weight: bold;
                        font-size: 30px;
                        font-family: Georgia, 'Times New Roman', Times, serif;
                        font-weight:bold;
                        color: #000;
                        display:flex;
                        align-items:center;
                        padding:5px;
                    }

                    .search-bar {
                        padding-right:25px;
                    }

                    .row {
                        align-items:flex-end;
                        padding: 8px;                       
                    }

                    a {
                        text-decoration:none;
                        color: #000;
                        font-family: Georgia, 'Times New Roman', Times, serif;
                        font-weight:bold;
                    }

                    a:hover {
                        text-decoration:underline;
                        color:#999;
                        transition: 0.5s;
                       
                    }

                    @media(max-width: 600px){
                        .app-bar{
                            border-bottom:1px solid #000;
                        }

                        .content-bar {
                            margin: auto;
                            max-width: 600px;
                            height: 55px;
                            display:flex;
                            align-items:center;    
                            justify-content: center;           
                        }


                        .logo {
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            width:50px;
                            height:50px;
                            padding-bottom:10px;
                        }

                        .title-bar {
                            font-weight: bold;
                            font-size: 25px;
                            font-family: Georgia, 'Times New Roman', Times, serif;
                            color: #000;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            padding-top:34px;
                        }

                        .search-bar{
                            display:none
                        }

                        .row {
                         display:none;
                       
                        }

                    }

                    @media(max-height: 600px){
                        .app-bar{
                            border-bottom:1px solid #000;
                        }

                        .content-bar {
                            margin: auto;
                            max-width: 600px;
                            height: 55px;
                            display:flex;
                            align-items:center;    
                            justify-content: center;           
                        }


                        .logo {
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            width:50px;
                            height:50px;
                            padding-bottom:10px;
                        }

                        .title-bar {
                            font-weight: bold;
                            font-size: 25px;
                            font-family: Georgia, 'Times New Roman', Times, serif;
                            color: #000;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            padding-top:34px;
                        }

                        .search-bar{
                            display:flex;
                            padding-top:15px;
                        }

                        .row {
                         display:none;
                       
                        }

                    }

                `}
                </style>            
        </>
        
    );
}