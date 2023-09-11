import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'

export default function TermsOfUsePage() {
  return (
    <Box sx={{ paddingInline: '6rem', paddingBlock: '2rem' }}>
      <Box
        sx={{
          marginBlockEnd: '1.2rem',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Terms of Use
        </Typography>
        <Typography variant="body1">Last Updated: 11/09/2023</Typography>
      </Box>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          marginBlockEnd: '1.4rem',
        }}
      >
        By accessing or using the ShareSphere website and services, you agree to
        comply with and be bound by the following Terms of Use. If you do not
        agree to these terms, please do not use ShareSphere.
      </Typography>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Acceptance of Terms
        </Typography>
        <ListItem>
          <ListItemText>
            By using ShareSphere, you acknowledge that you have read,
            understood, and agree to these Terms of Use and our Privacy Policy.
            These terms may be updated from time to time, and it is your
            responsibility to review them periodically.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          User Eligibility
        </Typography>
        <ListItem>
          <ListItemText>
            You must be at least 18 years old to use ShareSphere. By using our
            platform, you represent and warrant that you are of legal age and
            capable of forming a binding contract.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          User Accounts
        </Typography>
        <ListItem>
          <ListItemText>
            To access certain features of ShareSphere, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account credentials and are liable for any
            activities that occur under your account.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Prohibited Activities
        </Typography>
        <Typography variant="body1" gutterBottom>
          You agree not to:
        </Typography>
        <ListItem>
          <ListItemText>Use ShareSphere for any unlawful purpose.</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Violate these Terms of Use or any applicable laws.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Impersonate another person or entity.</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Use automated means to access or interact with ShareSphere.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Engage in any activity that disrupts or interferes with our
            platform.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Listings and Transactions
        </Typography>
        <ListItem>
          <ListItemText>
            ShareSphere serves as a platform for individuals to lend their
            belongings to one another. Users are responsible for the accuracy of
            their listings, the terms of their transactions, and their
            interactions with others. ShareSphere does not assume responsibility
            for the quality, safety, or legality of items listed or transactions
            conducted.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Intellectual Property
        </Typography>
        <ListItem>
          <ListItemText>
            All content and materials on ShareSphere, including text, graphics,
            logos, and software, are the property of ShareSphere or its
            licensors and are protected by intellectual property laws. You may
            not use, reproduce, distribute, or modify our content without our
            prior written consent.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Termination
        </Typography>
        <ListItem>
          <ListItemText>
            ShareSphere reserves the right to suspend or terminate your account
            and access to our platform at our discretion, without notice, if we
            believe you have violated these Terms of Use or engaged in
            prohibited activities.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Disclaimer of Warranties
        </Typography>
        <ListItem>
          <ListItemText>
            ShareSphere is provided &quot;as is&quot; and without warranties of
            any kind, either express or implied. We do not guarantee the
            accuracy, reliability, or availability of our platform, and we are
            not responsible for any harm or damage resulting from your use of
            ShareSphere.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Limitation of Liability
        </Typography>
        <ListItem>
          <ListItemText>
            ShareSphere and its affiliates shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss
            of profits or revenues, arising out of or in connection with your
            use of ShareSphere.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Governing Law
        </Typography>
        <ListItem>
          <ListItemText>
            These Terms of Use are governed by and construed in accordance with
            the laws of Israel. Any disputes or claims related to ShareSphere
            shall be resolved exclusively by the state courts located within
            Israel.
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <Typography variant="h2" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <ListItem>
          <ListItemText>
            If you have any questions or concerns about these Terms of Use,
            please contact us at yedidya.dev@gmail.com
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  )
}
