import type { Meta, StoryObj } from '@storybook/react'

import ItemsPendingRequestsList from './ItemsPendingRequestsList'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemsPendingRequestsList> = {
  title: 'Templates/ItemsPendingRequestsList',
  component: ItemsPendingRequestsList,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemsPendingRequestsList>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemsPendingRequestsList',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemsPendingRequestsList',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemsPendingRequestsList',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemsPendingRequestsList',
  },
}
