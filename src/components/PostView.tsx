import { useSession } from "next-auth/react";

export type PostViewProps = {
    image?:string;
    authorAvatar?:string;
    authorUsername:string;
    content:string;
    publishDate:string;
}

export function PostView({image ,authorAvatar, authorUsername, content , publishDate}: PostViewProps) {
  const { data, status } = useSession();  
  return (
      <>
        
              {status === "authenticated" && (
            
                <div className="post-view">
                  <div className="image-container row">
                    { image && <img src={image} alt="" />}
                  </div>
                  <div className="content-container row">
                  <div className="content-item-avatar">
                    {authorAvatar && <img className="img-avatar" src={authorAvatar} alt="avatar" style={{borderRadius: 50, marginRight: 5}}/>}
                      <span><b>{authorUsername}</b></span>
                  </div>
                  <div className="content-item" dangerouslySetInnerHTML={{__html: content}} />
                  
                    <div className="content-item">
                        <time dateTime={new Date(publishDate).toJSON()}><b>Data da publicação: </b>{new Date(publishDate).toLocaleDateString("pt-br")}</time>
                    </div>
                  </div>
                </div>     
                
              )}
              {status === "unauthenticated" && (
                <> 
                  <div className="login">
                    <h1 className="signup">Favor realizar login para visualizar as postagens:</h1>
                    <a  href="/api/auth/signin" title="Entrar">Login</a>
                  </div>
                </> 
              )}
            

            <style jsx>{`
              .login {
                
                background-color: rgba(255,222,0,255);
                width:500px;
                height:250px;
                padding:30px;
                margin:auto;
                margin-top:150px;
                border-radius:10px;
              }

              .login h1{
                text-align: center;
                margin-bottom:50px
              }

              .login a{
                display:flex;
                justify-content: center;
                border:1px solid #000;
                border-radius:8px;
                background-color: #000;
                color: rgba(255,222,0,255);
              }

              .login a:hover {
                opacity: 0.8;
                transform: translate;
                
              }
                
              .post-view {
                background-color:#fff;
                border-radius: 8px;
                border: 1px solid #ccc;
                display: flex;
                max-height: 800px;
                box-sizing: border-box;
              }

              .image-container {
                background-color: #000;
                flex: 2;
                display:flex;
                align-items:center;
              }

              .image-container img {
                width:100%;
                
              }

              .content-item-avatar {
                display:flex;
                align-items:center;
              }

              .content-container {
                flex: 1;
                overflow-x: auto;
                padding: 8px;
                margin-bottom:30px;
              } 

              @media(max-width: 600px){
                .post-view {
                    flex-direction:column;
                }

                .login {
                
                  background-color: rgba(255,222,0,255);
                  width:500px;
                  height:250px;
                  padding:30px;
                  margin:auto;
                  margin-top:150px;
                  border-radius:10px;
                }
              } 

              @media(max-height: 600px){
                .login {
                
                  background-color: rgba(255,222,0,255);
                  width:500px;
                  height:230px;
                  padding:30px;
                  margin:auto;
                 
                  border-radius:10px;
                }
              
              }

            `}</style>
        
      </>  
    );
}
