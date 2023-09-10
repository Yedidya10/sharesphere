import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true // add more `xs` breakpoint
    xsm: true
    mds: true
    mdl: true
    // mobile: true; // adds the `mobile` breakpoint
    // tablet: true;
    // laptop: true;
    // desktop: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 360,
      xsm: 480,
      sm: 600,
      mds: 720,
      md: 960,
      mdl: 1024,
      lg: 1200,
      xl: 1600,
    },
  },
  components: {
    MuiListItemText : {
      styleOverrides: {
        root: {
          color: 'text.primary',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'text.primary',
        },
        h1: {
          fontSize: '2.6rem',
          fontWeight: 400,
        },
        h2: {
          fontSize: '1.6rem',
          fontWeight: 500,
       
        },
        subtitle1: {
          fontSize: '1.2rem',
          fontWeight: 400,
        },
        body1: {
          fontSize: '1rem',
          fontWeight: 400,
        },
      },
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'p',
          body2: 'p',
        },
      },
    },

    // MuiAlert: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => ({
    //       ...(ownerState.severity === 'info' && {
    //         backgroundColor: '#60a5fa',
    //       }),
    //     }),
    //   },
    // },
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': '#E0E3E7',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor': '#6F7E8C',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '8px',
    //       textTransform: 'none',
    //       fontWeight: 'normal',
    //       fontSize: '14px',
    //       lineHeight: '20px',
    //       padding: '8px 16px',
    //       '&.MuiButton-containedPrimary': {
    //         backgroundColor: '#1E40AF',
    //         color: '#FFFFFF',
    //         '&:hover': {
    //           backgroundColor: '#1E40AF',
    //         },
    //       },
    //       '&.MuiButton-containedSecondary': {
    //         backgroundColor: '#FFFFFF',
    //         color: '#1E40AF',
    //         '&:hover': {
    //           backgroundColor: '#FFFFFF',
    //         },
    //       },
    //       '&.MuiButton-outlinedPrimary': {
    //         color: '#1E40AF',
    //         borderColor: '#1E40AF',
    //         '&:hover': {
    //           backgroundColor: '#1E40AF',
    //           color: '#FFFFFF',
    //         },
    //       },
    //       '&.MuiButton-outlinedSecondary': {
    //         color: '#FFFFFF',
    //         borderColor: '#FFFFFF',
    //         '&:hover': {
    //           backgroundColor: '#FFFFFF',
    //           color: '#1E40AF',
    //         },
    //       },
    //     },
    //   },
    // },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       '&.MuiTypography-h1': {
    //         fontSize: '48px',
    //         lineHeight: '56px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-h2': {
    //         fontSize: '40px',
    //         lineHeight: '48px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-h3': {
    //         fontSize: '32px',
    //         lineHeight: '40px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-h4': {
    //         fontSize: '24px',
    //         lineHeight: '32px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-h5': {
    //         fontSize: '20px',
    //         lineHeight: '28px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-h6': {
    //         fontSize: '16px',
    //         lineHeight: '24px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-subtitle1': {
    //         fontSize: '14px',
    //         lineHeight: '20px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-subtitle2': {
    //         fontSize: '12px',
    //         lineHeight: '16px',
    //         fontWeight: 'bold',
    //       },
    //       '&.MuiTypography-body1': {
    //         fontSize: '14px',
    //         lineHeight: '20px',
    //         fontWeight: 'normal',
    //         color: 'text.primary',
    //       },
    //       '&.MuiTypography-body2': {
    //         fontSize: '12px',
    //         lineHeight: '16px',
    //         fontWeight: 'normal',
    //         color: 'text.primary',
    //       },
    //       '&.MuiTypography-caption': {
    //         fontSize: '10px',
    //         lineHeight: '16px',
    //         fontWeight: 'normal',
    //         color: 'text.primary',
    //       },
    //       '&.MuiTypography-overline': {
    //         fontSize: '10px',
    //         lineHeight: '16px',
    //         fontWeight: 'bold',
    //         color: 'text.primary',
    //       },
    //     },
    //   },
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--TextField-brandBorderColor)',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderHoverColor)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&:before, &:after': {
            borderBottom: '2px solid var(--TextField-brandBorderColor)',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
          },
          '&.Mui-focused:after': {
            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: '2px solid var(--TextField-brandBorderColor)',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
          },
          '&.Mui-focused:after': {
            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
  },
})

export default defaultTheme
