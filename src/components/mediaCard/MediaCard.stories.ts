import type { Meta, StoryObj } from '@storybook/react'

import MediaCard from './MediaCard'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MediaCard> = {
  title: 'Templates/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof MediaCard>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'MediaCard',
  },
}

export const Secondary: Story = {
  args: {
    label: 'MediaCard',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'MediaCard',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'MediaCard',
  },
}
