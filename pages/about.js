import ContactForm from '../components/ContactForm'
import Contacts from '../components/Contacts'
import Section from '../components/Section'
import { sanityClient } from '../lib/sanity'

export default function About({ sections, people }) {
  return (
    <main>
      <article>
        <Section section={sections.companyInfoSection} />
        <Section section={sections.teamInfoSection} />
        <Section section={sections.ceoInfoSection} />
        <Contacts person={people.ceo} />
        <ContactForm />
      </article>
    </main>
  )
}

export const getStaticProps = async () => {
  const sectionsQuery =
    '*[ _type == "section" && name in ["company-info", "ceo-info", "team-info"]]'
  const peopleQuery = '*[ _type == "person" && role == "CEO" ]'
  const [companyInfoSection, ceoInfoSection, teamInfoSection] =
    await sanityClient.fetch(sectionsQuery)
  const [ceo] = await sanityClient.fetch(peopleQuery)

  return {
    props: {
      sections: { companyInfoSection, ceoInfoSection, teamInfoSection },
      people: { ceo },
    },
  }
}
