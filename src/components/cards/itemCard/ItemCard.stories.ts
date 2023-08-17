import type { Meta, StoryObj } from '@storybook/react'

import ItemCard from './ItemCard'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemCard> = {
  title: 'Templates/ItemCard',
  component: ItemCard,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemCard>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemCard',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemCard',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemCard',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemCard',
  },
}
