import { Avatar } from '../components/Avatar';

export type HeaderProps = {
    description: string;
    avatar:string;
    name: string;
}

export function Header({description, avatar, name} : HeaderProps){
    return (
        <div className="header">
            <div className="row">
                <div className="avatar item">
                    <Avatar src={avatar} size={150} alt=''/>
                </div>
            </div>
            <div className="row">
                <div className="name item">
                    <span>{name}</span>
                </div>

                <div className="description item">
                    <span>{description}</span>
                </div>
            </div>
            <style jsx>{`

                .header {
                    display:flex;
                    color: rgb(241,210,16);
                }
                
                .avatar {
                    padding-bottom: 10px;
                    border-radius: 90px;
                }

                .item:not(:first-child) {
                    margin-top: 4px;
                }

                .name {
                    font-size: 17px;
                    font-weight: bold;
                }

                .description {
                    margin: 0 10px;
                    margin-bottom: 10px;
                    font-size: 15px;
                }

                @media(max-width: 900px) {
                    .header {
                        flex-direction:column;
                        align-items:center;
                    }
                    
                    .name {
                        text-align: center;
                    }
                }

                @media(min-width: 900px) {
                    .header {
                        flex-direction:row;  
                    }

                    .name {
                      padding: 10px 0 0 0;
                      font-size: 18px
                    }

                    .description {
                        padding-top:15px;
                        font-size: 16px
                    }
                }
                
            `}</style>
        </div>
    );
}