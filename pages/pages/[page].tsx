import type { GetStaticPaths, GetStaticProps } from "next";
import { Feed, FeedProps } from "../../src/components/Feed";
import {apolloClient, gql} from "../../src/apolloClient";
import { Header, HeaderProps } from '../../src/layout/Header'
import { Footer } from "../../src/components/Footer";
import { FooterMobile } from "../../src/components/FooterMobile";
export type PostPageProps = {
  posts: FeedProps["items"];
  pagination: FeedProps["pagination"];
};

export type PostPageQuery = {
  page: string
}

export default function PostPage({posts, pagination} : PostPageProps){
  return (
    <>
      <Header
        avatar=""
        name="Viação Itapemirim"
        description='Ita' 
      />
      <Feed items={posts} pagination={pagination}/>

      <footer className="footer">
        <Footer/>
      </footer> 
      <footer className="footer-mobile">
        <FooterMobile />
      </footer>
      <style jsx>{`
        .footer-mobile {
          display:none;
        }

        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }

        @media(max-width: 600px){
            .footer {
              display: none;
            }

            .footer-mobile {
              display:block;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
            }
        }

        @media(max-height: 600px){
            .footer {
                display: none;
            }

            .footer-mobile {
              display:block;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
            }
        }
      `}</style>
    </>

  )
}

export const getStaticProps : GetStaticProps<PostPageProps, PostPageQuery> = async ({params}) => {
  const result = await apolloClient.query({
    query: gql`
      query{
      itaPosts (pagination:{
        pageSize:4,
        page:${params?.page ?? 1}
      }){
        meta {
          pagination{
            page
            pageSize
            pageCount
          }
        }
      data{
          attributes{
            title
            slug
            image{
              data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
      }
    `
  })

  const posts : FeedProps['items'] = result.data.itaPosts.data.map(({attributes: {title, slug, image: { data: { attributes: { url : image}}}}}:any)=> ({
    image:`https://webservices.jumpingcrab.com${image}`,
    link: `/posts/${slug}`,
    title,
  }));

  const { page:currentPage, pageCount } = result.data.itaPosts.meta.pagination;


  return {
    props: {
      posts,
      pagination: {
        pageCount,
        currentPage,
        hasNextPage: pageCount > currentPage,
        hasPreviousPage: currentPage > 1,
      }
    },
  }

}

export const getStaticPaths : GetStaticPaths<PostPageQuery> = async () => {
  const result = await apolloClient.query({
     query: gql`
      query{
        itaPosts (pagination:{
          pageSize:2,
          page:1
        }){
          meta {
            pagination{
              pageCount
            }
          }
        }
      }   
     `
  })

  const {data: {itaPosts: {meta : {pagination: {pageCount}}}}} = result;
  const postsPage: string[] = Array.from({length: pageCount}, (_, index) => (index +1).toString());
  
  return {
    paths: postsPage.map(page => ({params: {page}})),
    fallback: false
  }

}