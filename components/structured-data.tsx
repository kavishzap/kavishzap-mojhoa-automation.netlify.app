import { absoluteUrl, siteConfig } from '@/lib/site'

export function StructuredData() {
  const organizationId = `${siteConfig.url}/#organization`
  const websiteId = `${siteConfig.url}/#website`
  const founderId = `${siteConfig.url}/#founder`
  const webpageId = `${siteConfig.url}/#webpage`

  const sameAs = [siteConfig.social.linkedin, siteConfig.social.instagram].filter(
    (url): url is string => Boolean(url)
  )

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.legalName,
        alternateName: [siteConfig.name, siteConfig.shortName, 'Mojhoa Automation'],
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logo),
        image: absoluteUrl(siteConfig.ogImage),
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneE164,
        founder: { '@id': founderId },
        areaServed: [
          { '@type': 'Country', name: 'Mauritius' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        knowsAbout: siteConfig.services,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${siteConfig.url}/#localbusiness`,
        name: siteConfig.legalName,
        image: absoluteUrl(siteConfig.ogImage),
        url: siteConfig.url,
        telephone: siteConfig.contact.phoneE164,
        email: siteConfig.contact.email,
        address: {
          '@type': 'PostalAddress',
          addressCountry: siteConfig.contact.countryCode,
          addressLocality: siteConfig.contact.location,
        },
        priceRange: '$$',
        parentOrganization: { '@id': organizationId },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { '@id': organizationId },
        inLanguage: siteConfig.language,
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: siteConfig.url,
        name: `${siteConfig.name} | ${siteConfig.tagline}`,
        description: siteConfig.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        inLanguage: siteConfig.language,
      },
      {
        '@type': 'Person',
        '@id': founderId,
        name: siteConfig.founder.name,
        jobTitle: siteConfig.founder.role,
        worksFor: { '@id': organizationId },
        knowsAbout: [
          'Full Stack Development',
          'Business Automation',
          'AI Solutions',
          'Digital Systems',
          'Mauritius',
        ],
        url: siteConfig.url,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteConfig.url}/#services`,
        name: siteConfig.name,
        url: siteConfig.url,
        provider: { '@id': organizationId },
        areaServed: { '@type': 'Country', name: 'Mauritius' },
        serviceType: siteConfig.services,
        description: siteConfig.description,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
