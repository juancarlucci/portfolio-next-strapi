import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Skeleton from '../../components/Skeleton'
import { motion } from "framer-motion";
import React from "react";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

//* getStaticPaths tells Next.js how many pages there are. A page per portfolio project.
export const getStaticPaths = async () => {
  const res = await client.getEntries({ 
    content_type: "project"
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

    //* Static Site Generation builds all files at once. When one file changes, all files are re-built
    //* Setting fallback: false creates Static Site Generation
    //* Incremental Static Generation: when 1st visit, build that page. When 2nd visit, serve static page
    //* Setting fallback: true creates Incremental Static Generation
  return {
    paths,
    fallback: true
  }
}

//* getStaticProps fetches the data for each individual page
export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'project',
    'fields.slug': params.slug
  }) 

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { project: items[0] },
    revalidate: 1
  }
}

export default function ProjectDetails({ project }) {
  if (!project) return <Skeleton />

  const { featuredImage, title, subTitle, skills, details, gitHubLink, imagesAdditional, liveCodeLink } = project.fields;

  const transitionVariant = {
        pageInitial: {
            opacity: 0,
                x: '100vw'
        },
        pageAnimate: {
            opacity: 1,
                x: 0,
            transition:{delay: 0.3, type:'spring', stiffness: 223}
        },
        exit: {
            x: '-100vw',
                transition: { ease: 'easeInOut'}
        }
    }

  return (<div key={title} className="details-container" >
            <motion.div
               variants="transitionVariant"
               initial="pageInitial"
               animate="pageAnimate"
               exit="exit">

            <div className="details-header">
                <div className="details-text">
                    <h2 className="title">{ title }</h2>
                    <h4 className="sub-title">{ subTitle }</h4>
                </div>

              <Image
                  src={'https:' + featuredImage.fields.file.url}
                  width={featuredImage.fields.file.details.image.width}
                  height={featuredImage.fields.file.details.image.height}
              />

            </div>

            <div className="content">

              <div className="column-left">

                {imagesAdditional && imagesAdditional.map(img => (
                  <div className="image-item">
                    <Image
                        src={'https:' + img.fields.file.url}
                        width={img.fields.file.details.image.width}
                        height={img.fields.file.details.image.height}
                    />
                  </div>
              ))}

            </div>

              <div className="column-right">

                <div>{documentToReactComponents(details)}</div>
                <div className="skills">
                  <h3>Skills</h3>
                    {skills.map(skill => (
                      <span key={skill}>{ skill }</span>
                  ))}
                </div>
                <div className="links">
                  {gitHubLink &&
                  <a className="code-link button"
                    href={gitHubLink} target="_blank">Code
                  </a>}
                  {liveCodeLink &&

                  <a className="live-link button"
                     href={liveCodeLink} target="_blank"> Live
                  </a>}
                </div>


              </div>
            </div>
            </motion.div>
            <style jsx>{`
  
              .details-container {
                max-width: 1280px;
                margin: 0 auto;
                padding-top: 200px;
              }
      
              .details-header {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
      
              .details-text {
                text-align: center;
                margin-bottom: 120px;
              }
              
              .details-text h2,
              .details-text h3,
              .details-text h4 {
                font-weight: 300;
                text-transform: uppercase;
              }
              
              .details-header .title {
                font-size: 2rem;
                margin-bottom: 17px;
              }
             
              .content {
                  margin: 120px auto;
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  grid-gap: 2rem;
              }
      
              .column-left,
              .column-right {
                flex: 1 0 230px;
              }
      
              .column-left {
                text-align: center;
              }
      
              .image-item {
                margin: 16px auto 60px auto;
              }
      
              .column-right {
                padding-left: 40px;
              }
      
        
              .skills {
                margin-bottom: 30px;
              }
              
              .skills p {
                margin: 0;
              }
      
              .skills-item span{
                font-size: 1.4rem;
              }
      
              .skills span::after {
                content: ", ";
              }
              .skills span:last-child::after {
                content: ".";
              }
              
              .links a:hover {
                background-color: #888;
                color: #ffffff;
              }
      
           `}</style>


      </div>
  )
}