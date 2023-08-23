import type { Meta, StoryObj } from '@storybook/react'

import SignInButton from './SignInButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SignInButton> = {
  title: 'Templates/SignInButton',
  component: SignInButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SignInButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SignInButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SignInButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SignInButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SignInButton',
  },
}
