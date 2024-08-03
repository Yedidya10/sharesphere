import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // next-intl provides a temporary API that can be used to distribute the locale that
  // is received via params in layouts and pages for usage in all Server Components that
  // are rendered as part of the request.
  // For more information, see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale)
  return (
    <Box sx={{ paddingInline: '6rem', paddingBlock: '2rem' }}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{
          fontSize: '3.5rem',
        }}
      >
        About
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', gap: '4rem' }}>
          <Box
            sx={{
              width: '600px',
              height: '500px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1572202808998-93788f6d39da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
              alt="Picture of the author"
              fill={true}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
          <Box
            sx={{
              width: '50%',

              display: 'flex',
              flexDirection: 'column',

              gap: '2rem',
            }}
          >
            <Box>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: '2rem',
                }}
              >
                What is Share Sphere?
              </Typography>
              <Typography variant="body1" gutterBottom>
                The Share Sphere is a place where people can share their
                resources with each other.
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: '2rem',
                }}
              >
                Where Did It All Start? - The Story
              </Typography>
              <Typography variant="body1" gutterBottom>
                In the bustling heart of our city, the idea for our lending
                community sprouted from a simple yet profound inspiration - the
                vision of Jacques Fresco. His dream of a future where people
                freely share resources and build stronger communities ignited a
                passion within us to turn that dream into a reality.
              </Typography>
              <Typography variant="body1" gutterBottom>
                We believe that the future of our world is in our hands. We can
                choose to continue on the path of overconsumption and waste, or
                we can choose to build a better future for ourselves and our
                children. We can choose to share our resources and build
                stronger communities. We can choose to make a difference.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', gap: '4rem' }}>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: '2rem',
                }}
              >
                The First Seedling in mind
              </Typography>
              <Typography variant="body1" gutterBottom>
                Our journey began with the seedling of an idea - to create a
                online lending community where individuals could lend and borrow
                items without the burden of ownership. Inspired by
                Fresco`&lsquo;`s vision, we envisioned a online platform where
                neighbors could share, connect, and build a more sustainable
                future together.
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: '2rem',
                }}
              >
                Seedling Growth
              </Typography>
              <Typography variant="body1" gutterBottom>
                We started with a small team of passionate individuals who
                shared our vision for a better future. Together, we built the
                first version of our platform and it is expected to be launched
                during the year 2024. We hope that you will join us on this
                journey.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Nurtured by our commitment to this vision, our team embarked on
                a journey of hard work and dedication. We overcame challenges,
                collaborated with like-minded individuals, and diligently
                developed the platform you see today, all with the singular
                purpose of making resource-sharing accessible and effortless for
                everyone.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Image
              src="https://images.unsplash.com/photo-1611223235982-891064f27716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt="Picture of the author"
              width={600}
              height={600}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', gap: '4rem' }}>
          <Box
            sx={{
              width: '600px',
              height: '500px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt="Picture of the author"
              fill={true}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: '2rem',
              }}
            >
              Sustainability and the Environment
            </Typography>
            <Typography variant="body1" gutterBottom>
              As our world faces pressing environmental issues, our lending
              community stands as a beacon of hope. We firmly believe that
              sharing resources is a powerful way to reduce waste, minimize our
              ecological footprint, and contribute to a greener planet. Our
              platform empowers users to take small steps towards a more
              sustainable future.
            </Typography>
            <Typography variant="body1" gutterBottom>
              We are committed to building a sustainable future for our planet
              and our children. We believe that sharing resources is a powerful
              way to reduce waste, minimize our ecological footprint, and
              contribute to a greener planet. Our platform empowers users to
              take small steps towards a more sustainable future.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', gap: '4rem' }}>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: '2rem',
              }}
            >
              Building an Innovative Community
            </Typography>
            <Typography variant="body1" gutterBottom>
              We are committed to building a community of like-minded
              individuals who share our vision for a better future. We believe
              that sharing resources is a powerful way to reduce waste, minimize
              our ecological footprint, and contribute to a greener planet. Our
              platform empowers users to take small steps towards a more
              sustainable future.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Technology is at the heart of our mission. We harness its
              potential not for profit, but for the greater good. Our innovative
              tools and features are designed to bring people together, to
              connect our community members who share a lofty goal - to enrich
              lives through the simple act of sharing.
            </Typography>
          </Box>
          <Box
            sx={{
              width: '600px',
              height: '500px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80
                    "
              alt="Picture of the author"
              fill={true}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', gap: '4rem' }}>
          <Box
            sx={{
              width: '600px',
              height: '500px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1550096141-7263640aa48c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Picture of the author"
              fill={true}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: '2rem',
              }}
            >
              Contribution within the Local Community
            </Typography>
            <Typography variant="body1" gutterBottom>
              Through the lens of our community, we`&lsquo;`ve witnessed
              extraordinary connections form. Neighbors have met neighbors,
              friendships have blossomed, and resources have found new life.
              Each item lent represents a connection forged, a moment of trust,
              and a step towards a stronger, more vibrant local community.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
