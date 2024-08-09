import type { Meta, StoryObj } from '@storybook/react'

import LendingStatusFilter from './LendingStatusFilter'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LendingStatusFilter> = {
  title: 'Templates/LendingStatusFilter',
  component: LendingStatusFilter,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof LendingStatusFilter>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'LendingStatusFilter',
  },
}

export const Secondary: Story = {
  args: {
    label: 'LendingStatusFilter',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'LendingStatusFilter',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'LendingStatusFilter',
  },
}
