import type { Meta, StoryObj } from '@storybook/react'

import UserProfileCompletionForm from './UserProfileCompletionForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UserProfileCompletionForm> = {
  title: 'Templates/UserProfileCompletionForm',
  component: UserProfileCompletionForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof UserProfileCompletionForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'UserProfileCompletionForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'UserProfileCompletionForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'UserProfileCompletionForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'UserProfileCompletionForm',
  },
}
