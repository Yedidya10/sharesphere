import type { Meta, StoryObj } from '@storybook/react'

import SignInForm from './SignInForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SignInForm> = {
  title: 'Components/Auth/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SignInForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SignInForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SignInForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SignInForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SignInForm',
  },
}
