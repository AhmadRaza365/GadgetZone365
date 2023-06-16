/* eslint-disable @next/next/no-img-element */
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import NewsletterForm from '@/components/NewsletterForm'
import Card from '@/components/Card'

const MAX_DISPLAY = 8

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="h-64 w-full overflow-hidden lg:h-96">
          <img
            src="/static/images/gadgetsZone365-heroImage.webp"
            alt="GadgetsZone365 HeroImage"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Articles
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="flex flex-wrap justify-center">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            return (
              <Card
                key={slug}
                title={title}
                description={summary}
                imgSrc={images ? images[0] : '/static/images/time-machine.jpg'}
                href={`/blog/${slug}`}
                showReadMore={true}
                date={date}
              />
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center text-base font-medium leading-6">
          <Link
            href="/blog"
            className="mt-5 mb-10 rounded-md bg-primary-500 py-3 px-6 text-xl text-white hover:bg-primary-600 dark:hover:bg-primary-400"
            aria-label="view all posts"
          >
            View All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
