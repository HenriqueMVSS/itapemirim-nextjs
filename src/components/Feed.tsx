import Link from "next/link";

export type FeedProps = {
    items: FeedItemProps[];
    pagination?: PaginationProps;
}

export type PaginationProps = {
    pageCount: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

export type FeedItemProps = {
    image:string;
    link: string;
    title: string;
}

export function Feed({items}: FeedProps) {
    return (
        <div className="feed">
            <div className="feed-grid">{items.map(item => (
                <FeedItem {...item} />
            ))}</div>

            <style jsx>{`
                .feed {
                    padding: 16px 10px;
            
                }

                .feed-grid {
                    display: grid;
                    gap:10px;
                    grid-template-columns: repeat(2, 1fr)
                }

                @media(min-width: 900px) {
                    .feed {
                    padding: 32px 15px;
                    } 

                    .feed-grid {
                    display: grid;
                    gap:16px;
                    grid-template-columns: repeat(4, 1fr)
                    }
                }
                    
            `}</style>
        </div>
    );
}

function FeedItem({ image, link, title }: FeedItemProps){
    return <Link href={link}>
        <img src={image} alt={title} />
        
        <style jsx>{`
          img {
            width: 100%;
            height: 100%;
          }

        `}</style>

    </Link>
}