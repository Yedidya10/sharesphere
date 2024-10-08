import type { Meta, StoryObj } from '@storybook/react'

import PostingStatusFilter from './PostingStatusFilter'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PostingStatusFilter> = {
  title: 'Templates/PostingStatusFilter',
  component: PostingStatusFilter,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof PostingStatusFilter>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'PostingStatusFilter',
  },
}

export const Secondary: Story = {
  args: {
    label: 'PostingStatusFilter',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'PostingStatusFilter',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'PostingStatusFilter',
  },
}
