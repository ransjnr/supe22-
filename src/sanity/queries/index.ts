import { groq } from "next-sanity";

// ── Projects ─────────────────────────────────────────────────────────────────

export const projectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    "id": _id,
    title,
    description,
    category,
    tags,
    status,
    github,
    demo,
    paper,
    featured,
    year,
    thumbnail,
    thumbnailUrl
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(year desc)[0...4] {
    _id,
    "id": _id,
    title,
    description,
    category,
    tags,
    status,
    github,
    demo,
    paper,
    featured,
    year,
    thumbnail,
    thumbnailUrl
  }
`;

// ── Research Posts ────────────────────────────────────────────────────────────

export const allPostsQuery = groq`
  *[_type == "researchPost" && published == true] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    summary,
    tags,
    category,
    published,
    "readingTime": round(length(pt::text(coalesce(body, ""))) / 5 / 200)
  }
`;

export const latestPostsQuery = groq`
  *[_type == "researchPost" && published == true] | order(date desc)[0...3] {
    "slug": slug.current,
    title,
    date,
    summary,
    tags,
    category,
    published,
    "readingTime": round(length(pt::text(coalesce(body, ""))) / 5 / 200)
  }
`;

export const postBySlugQuery = groq`
  *[_type == "researchPost" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    date,
    summary,
    tags,
    category,
    published,
    body,
    "readingTime": round(length(pt::text(coalesce(body, ""))) / 5 / 200)
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "researchPost" && published == true] {
    "slug": slug.current
  }
`;

// ── Timeline ──────────────────────────────────────────────────────────────────

export const timelineQuery = groq`
  *[_type == "timelineEvent"] | order(order asc) {
    _id,
    year,
    title,
    institution,
    description,
    type
  }
`;

// ── Achievements ──────────────────────────────────────────────────────────────

export const achievementsQuery = groq`
  *[_type == "achievement"] | order(year desc) {
    _id,
    "id": _id,
    title,
    issuer,
    year,
    type,
    description
  }
`;

// ── Startups ──────────────────────────────────────────────────────────────────

export const startupsQuery = groq`
  *[_type == "startup"] | order(year desc) {
    _id,
    "id": _id,
    name,
    tagline,
    description,
    role,
    status,
    year,
    link,
    logo
  }
`;

// ── Initiatives ───────────────────────────────────────────────────────────────

export const initiativesQuery = groq`
  *[_type == "initiative"] {
    _id,
    "id": _id,
    name,
    tagline,
    description,
    status,
    link,
    tags
  }
`;

// ── Collaborations ────────────────────────────────────────────────────────────

export const collaborationsQuery = groq`
  *[_type == "collaboration"] {
    _id,
    "id": _id,
    title,
    area,
    description,
    ideal,
    commitment,
    open
  }
`;

// ── Services ──────────────────────────────────────────────────────────────────

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    "id": _id,
    name,
    tagline,
    description,
    deliverables,
    engagement,
    priceRange,
    cta,
    featured
  }
`;

// ── Publications ──────────────────────────────────────────────────────────────

export const publicationsQuery = groq`
  *[_type == "publication"] | order(year desc) {
    _id,
    "id": _id,
    title,
    authors,
    venue,
    year,
    type,
    doi,
    arxiv,
    pdf,
    abstract,
    tags
  }
`;

// ── Site Settings (singleton) ─────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    yearsExperience,
    projectsCompleted,
    papersPublished,
    countriesReached,
    bioHeading,
    availabilityStatus,
    contactEmail,
    "profileImageUrl": profileImage.asset->url,
    "profileImageAlt": profileImage.alt,
    socialGithub,
    socialLinkedin,
    socialTwitter,
    socialGoogleScholar,
    appointmentBookingUrl,
    bookingTitle,
    bookingDescription
  }
`;
