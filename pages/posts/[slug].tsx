import type { GetStaticPaths, GetStaticProps } from "next";
import { PostView, PostViewProps } from "../../src/components/PostView";
import {apolloClient, gql} from "../../src/apolloClient";
import { Footer } from "../../src/components/Footer";
import { FooterMobile } from "../../src/components/FooterMobile";
import {remark} from "remark"
import html from 'remark-html'

export type PostPageProps = PostViewProps;

export type PostPageQuery = {
  slug: string
}

export default function PostPage(props : PostPageProps){
  return (
    <>
      <PostView {...props}/>

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

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageQuery
> = async ({ params }) => {
  const result = await apolloClient.query({
    query: gql`
      query {
        itaPosts(filters: {
          slug: {
            eq: "${params?.slug ?? ``}"
          }
        }) {
          data {
            attributes {
              title
              AuthorUsername
              slug
              content
              publishDate
              authorAvatar {
                data {
                  attributes {
                    url
                  }
                }
              }
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  const {
    attributes: {
      AuthorUsername: authorUsername,
      content,
      publishDate,
      image: {
        data: {
          attributes: { url: imageUrl },
        },
      },
      authorAvatar: {
        data: {
          attributes: { url: avatarUrl },
        },
      },
    },
  } = result.data.itaPosts.data[0];

  return {
    props: {
      image: `https://webservices.jumpingcrab.com${imageUrl}`,
      authorAvatar: `https://webservices.jumpingcrab.com${avatarUrl}`,
      publishDate,
      authorUsername,
      content: (await remark().use(html).process(content)).toString(),
    },
  };
};

export const getStaticPaths : GetStaticPaths<PostPageQuery> = async () => {
  const result = await apolloClient.query({
     query: gql`
      query {
        itaPosts{
          data{
            attributes{
              slug
            }
          }
        }
      }
     `
  })

  const {data: {itaPosts: {data : postsSlugs}}} = result;
 const slugs: string[] = postsSlugs.map(({attributes: {slug}}  : any) => slug)
  console.log(slugs)
  return {
    paths: slugs.map(slug => ({params: {slug}})),
    fallback: false
  }

}