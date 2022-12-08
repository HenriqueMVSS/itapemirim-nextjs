export type PostView = {
    image?:string;
    authorAvatar?:string;
    authorUsername:string;
    content:string;
    publishDate:Date;
}

export function PostView({image ,authorAvatar, authorUsername, content , publishDate}: PostView) {
    return (
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
                    <time dateTime={publishDate.toJSON()}><b>Data da publicação: </b>{publishDate.toLocaleDateString("pt-br")}</time>
                </div>
            </div>

            <style jsx>{`
              .post-view {
                background-color:#fff;
                border-radius: 8px;
                border: 1px solid #ccc;
                display: flex;
                max-height: 900px;
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
              } 

              @media(max-width: 600px){
                .post-view {
                    flex-direction:column;
                }
              } 

            `}</style>
        </div>
    );
}
