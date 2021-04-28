import { createClient } from 'contentful';
import ProjectCard from '../components/ProjectCard';
import Services from "../components/Services";

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const resProjects = await client.getEntries({ content_type: "project" });
  const resServices = await client.getEntries({ content_type: "services" });

  return {
    props: {
      projects: resProjects.items,
      services: resServices.items
    },
    revalidate: 1
  }
}

export default function Projects({ projects, services }) {


  return (<>
          <div className="projects-header">
              <h2 className="projects-title">
                  Projects
              </h2>
          </div>
          <div className="projects-grid">
          {projects.map(project => (
              <ProjectCard key={project.sys.id} project={project} />
          ))}
          </div>
          {services.map(service => (
              <Services key={service.sys.id} service={service} />
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