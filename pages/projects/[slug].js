import Image from 'next/image'
import Skeleton from '../../components/Skeleton'
import { motion } from "framer-motion";
import React from "react";
import ReactMarkdown from 'react-markdown'

//* getStaticPaths tells Next.js how many pages there are. A page per portfolio project.
export const getStaticPaths = async () => {
    const { STRAPI_API } = process.env;
    const res = await fetch(`${STRAPI_API}/portfolios`);
    const projects = await res.json();

    const paths = projects.map((project) => ({
        params: { slug: project.Slug },
    }));

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

    const { slug } = params;
    const { STRAPI_API } = process.env;

    const res = await fetch(`${STRAPI_API}/portfolios?Slug=${slug}`);
    const data = await res.json();
    const project = data[0];

  if (!data.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { project, STRAPI_API },
  }
}

export default function ProjectDetails({ project, STRAPI_API }) {
  if (!project) return <Skeleton />

  const { FeaturedImage, Title, subTitle, Skills, Details, GitHubLink, imagesAdditional, LiveCodeLink } = project;
  console.log("imagesAdditional", imagesAdditional)

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

  return (<div key={project.id} className="details-container" >
            <motion.div
               variants="transitionVariant"
               initial="pageInitial"
               animate="pageAnimate"
               exit="exit">

            <div className="details-header">
                <div className="details-text">
                    <h2 className="title">{ Title }</h2>
                    <p className="sub-title">{ subTitle }</p>
                </div>

              <img
                  src={STRAPI_API + FeaturedImage.url}
                  width={FeaturedImage.width}
                  height={FeaturedImage.height}
              />

            </div>

            <div className="content">

              <div className="column-left">

                {imagesAdditional && imagesAdditional.map(img => (
                  <div className="image-item">
                    <img
                        key={img.id}
                        src={STRAPI_API + img.url}
                        width={img.width}
                        height={img.height}
                    />
                  </div>
              ))}

            </div>

              <div className="column-right">
                <ReactMarkdown>
                    {Details}
                </ReactMarkdown>
                <div className="skills">
                  <h3>Skills</h3>
                    {Skills}
                </div>
                <div className="links">
                  {GitHubLink &&
                  <a className="code-link button"
                    href={GitHubLink} target="_blank">Code
                  </a>}
                  {LiveCodeLink &&

                  <a className="live-link button"
                     href={LiveCodeLink} target="_blank"> Live
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