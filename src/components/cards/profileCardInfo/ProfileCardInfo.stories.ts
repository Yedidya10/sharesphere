import type { Meta, StoryObj } from '@storybook/react'

import ProfileCardInfo from './ProfileCardInfo'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProfileCardInfo> = {
  title: 'Templates/ProfileCardInfo',
  component: ProfileCardInfo,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileCardInfo>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ProfileCardInfo',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ProfileCardInfo',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ProfileCardInfo',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ProfileCardInfo',
  },
}
