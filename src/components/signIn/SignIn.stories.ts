import type { Meta, StoryObj } from '@storybook/react'

import SignIn from './SignIn'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SignIn> = {
  title: 'Components/Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SignIn>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SignIn',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SignIn',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SignIn',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SignIn',
  },
}
