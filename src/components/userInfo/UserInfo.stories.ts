import type { Meta, StoryObj } from '@storybook/react'

import UserInfo from './UserInfo'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UserInfo> = {
  title: 'Templates/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof UserInfo>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'UserInfo',
  },
}

export const Secondary: Story = {
  args: {
    label: 'UserInfo',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'UserInfo',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'UserInfo',
  },
}
