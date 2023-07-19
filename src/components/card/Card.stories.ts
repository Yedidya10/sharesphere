import type { Meta, StoryObj } from '@storybook/react'

import Card from './Card'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: 'Templates/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Card',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Card',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Card',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Card',
  },
}
