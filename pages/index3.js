import { createClient } from 'contentful';
import ProjectCard from 'components/ProjectCard';
import Services from "components/Services";

// export async function getStaticProps() {
export const getStaticProps = async () => {
    // get posts from api
    const { STRAPI_API } = process.env;
    const res = await fetch(`${STRAPI_API}/portfolios`);
    const projects = await res.json();
    const res2 = await fetch(`${STRAPI_API}/highlights`);
    const services = await res2.json();
    // console.log("highlights", services);

    console.log("STRAPI_API", STRAPI_API)

    return {
        props: {
            projects,
            services,
            strapiURL: STRAPI_API
        },
    };
}

export default function Projects({ projects, services, strapiURL}) {

  return (<>
          <div className="projects-header">
              <h2 className="projects-title">
                  Projects
              </h2>
          </div>
          <div className="projects-grid">
          {projects.slice(0).reverse().map(project => (
              <ProjectCard key={project.id} project={project} strapiURL={strapiURL} />
          ))}
          </div>
          {services.map(service => (
              <Services key={service.id} service={service} />
          ))}

          <style jsx>{`
            
            .projects-header {
              margin: 0 auto;
              padding-top: 200px;
              text-align: center;
            }
              
            .projects-title {
              text-transform: uppercase;
              font-size: 36px;
              font-weight: 300;
            }
            
            .projects-grid {
              max-width: 1280px;
              margin: 120px auto;
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              grid-gap: 2rem;
            }
            
            .projects-grid > div:nth-of-type(1) {
              grid-column: 1/3;
            }
            
          `}</style>
      </>
  )
};