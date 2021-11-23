import ContactForm from '../components/ContactForm'
import Contacts from '../components/Contacts'
import Section from '../components/Section'
import { sanityClient, urlFor } from '../lib/sanity'
import Image from 'next/image'

export default function About({ sections, people, teamImage }) {
  return (
    <main className="page-about">
      <article>
        <Section section={sections.companyInfoSection} />
        <Section section={sections.teamInfoSection}>
          <Image
            src={urlFor(teamImage).width(1800).height(1200).url()}
            alt={teamImage.altText}
            width={1800}
            height={1200}
          />
        </Section>
        <Section section={sections.ceoInfoSection}>
          <Contacts person={people.ceo} />
        </Section>
        <ContactForm />
      </article>
    </main>
  )
}

export const getStaticProps = async () => {
  const sectionsQuery =
    '*[ _type == "section" && name in ["company-info", "ceo-info", "team-info"]]'
  const peopleQuery = '*[ _type == "person" && role == "CEO" ]'
  const teamImageQuery =
    '*[_type == "websiteImage" && name == "the-team"]{image}'
  const [companyInfoSection, ceoInfoSection, teamInfoSection] =
    await sanityClient.fetch(sectionsQuery)
  const [ceo] = await sanityClient.fetch(peopleQuery)
  const [{ image }] = await sanityClient.fetch(teamImageQuery)
  return {
    props: {
      sections: { companyInfoSection, ceoInfoSection, teamInfoSection },
      people: { ceo },
      teamImage: image,
    },
  }
}
