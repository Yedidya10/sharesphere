import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function PrivacyPolicyPage({
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
      <Box
        sx={{
          marginBlockEnd: '1.2rem',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1">Last Updated: 10/09/2023</Typography>
      </Box>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          marginBlockEnd: '1.4rem',
        }}
      >
        ShareSphere is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information
        when you use our website and services. By accessing or using
        ShareSphere, you consent to the practices described in this Privacy
        Policy.
      </Typography>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Information We Collect
        </Typography>
        <ListItem>
          <ListItemText>
            Personal Information: When you create an account on ShareSphere, we
            may collect personal information such as your name, email address,
            and phone number.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            User Content: We collect information that you voluntarily provide
            when using our platform, including item listings, reviews, and
            messages between users.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Automated Information: We may collect technical information about
            your device, browsing actions, and usage patterns, such as your IP
            address, browser type, and operating system.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          How We Use Your Information
        </Typography>
        <ListItem>
          <ListItemText>
            Provide Services: We use your personal information to create and
            maintain your account, facilitate transactions, and communicate with
            you about your account and our services.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Improve Services: We may use aggregated and anonymized data for
            analytical purposes to improve our services, user experience, and
            website performance.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Communication: We may send you updates, promotional materials, and
            notifications related to our services, but you can opt out of these
            communications at any time.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Sharing Your Information
        </Typography>
        <ListItem>
          <ListItemText>
            With Other Users: We may share your information with other users as
            necessary to facilitate transactions, such as sharing contact
            information between parties involved in a lending or borrowing
            transaction.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Service Providers: We may share your information with third-party
            service providers who assist us in operating and improving our
            platform.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Legal Compliance: We may disclose your information as required by
            law, in response to legal requests, or to protect our rights,
            privacy, safety, or property.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Data Security
        </Typography>
        <ListItem>
          <ListItemText>
            We take reasonable measures to protect your information from
            unauthorized access, disclosure, alteration, or destruction.
            However, no data transmission over the internet is completely
            secure, and we cannot guarantee the security of your data.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Your Choices
        </Typography>
        <ListItem>
          <ListItemText>
            You have the right to access, update, and delete your personal
            information. You can also adjust your communication preferences.
            Please contact us at yedidya.dev@gmail.com to make these requests.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <ListItem>
          <ListItemText>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated Privacy Policy on our website.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at yedidya.dev@gmail.com
        </Typography>
      </List>
    </Box>
  )
}
