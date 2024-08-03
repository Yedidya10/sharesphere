import type { Meta, StoryObj } from '@storybook/react'

import ItemPendingRequest from './ItemPendingRequest'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemPendingRequest> = {
  title: 'Templates/ItemPendingRequest',
  component: ItemPendingRequest,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemPendingRequest>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemPendingRequest',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemPendingRequest',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemPendingRequest',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemPendingRequest',
  },
}
