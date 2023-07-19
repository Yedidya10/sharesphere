import type { Meta, StoryObj } from '@storybook/react'

import Cards from './Cards'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Cards> = {
  title: 'Templates/Cards',
  component: Cards,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof Cards>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Cards',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Cards',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Cards',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Cards',
  },
}
