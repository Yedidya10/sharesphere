import type { Meta, StoryObj } from '@storybook/react'

import ProfileUpdateForm from './ProfileUpdateForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProfileUpdateForm> = {
  title: 'Templates/ProfileUpdateForm',
  component: ProfileUpdateForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileUpdateForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ProfileUpdateForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ProfileUpdateForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ProfileUpdateForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ProfileUpdateForm',
  },
}
