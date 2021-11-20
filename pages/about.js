import Section from '../components/Section'
import { sanityClient } from '../sanity'

export default function About({
  companyInfoSection,
  ceoInfoSection,
  teamInfoSection,
}) {
  return (
    <main>
      <article>
        <Section section={companyInfoSection} />
        <Section section={teamInfoSection} />
        <Section section={ceoInfoSection} />
      </article>
    </main>
  )
}

export const getStaticProps = async () => {
  const query =
    '*[ _type == "section" && name in ["company-info", "ceo-info", "team-info"]]'
  const [companyInfoSection, ceoInfoSection, teamInfoSection] =
    await sanityClient.fetch(query)
  return {
    props: {
      companyInfoSection,
      ceoInfoSection,
      teamInfoSection,
    },
  }
}
