import type { Meta, StoryObj } from '@storybook/react'

import SignUpForm from './SignUpForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Auth/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SignUpForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SignUpForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SignUpForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SignUpForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SignUpForm',
  },
}
