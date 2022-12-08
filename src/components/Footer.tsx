export function Footer(){
    return (
       <> 
        <div className="footer">
           <div className="footer-items">
            <div className="content" ><b>Itapemirim</b></div>
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
                font-size: 25px
                
            }

            .content b{
                color:#ffde00;
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