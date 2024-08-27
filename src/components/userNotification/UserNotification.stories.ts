import type { Meta, StoryObj } from '@storybook/react'

import UserNotification from './UserNotification'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UserNotification> = {
  title: 'Templates/UserNotification',
  component: UserNotification,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof UserNotification>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'UserNotification',
  },
}

export const Secondary: Story = {
  args: {
    label: 'UserNotification',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'UserNotification',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'UserNotification',
  },
}
