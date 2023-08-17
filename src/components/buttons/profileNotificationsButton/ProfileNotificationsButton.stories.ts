import type { Meta, StoryObj } from '@storybook/react'

import ProfileNotificationsButton from './ProfileNotificationsButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProfileNotificationsButton> = {
  title: 'Templates/ProfileNotificationsButton',
  component: ProfileNotificationsButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileNotificationsButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ProfileNotificationsButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ProfileNotificationsButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ProfileNotificationsButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ProfileNotificationsButton',
  },
}
