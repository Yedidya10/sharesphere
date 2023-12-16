import type { Meta, StoryObj } from '@storybook/react'

import CookiesConsentBanner from './CookiesConsentBanner'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CookiesConsentBanner> = {
  title: 'Templates/CookiesConsentBanner',
  component: CookiesConsentBanner,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CookiesConsentBanner>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CookiesConsentBanner',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CookiesConsentBanner',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CookiesConsentBanner',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CookiesConsentBanner',
  },
}
