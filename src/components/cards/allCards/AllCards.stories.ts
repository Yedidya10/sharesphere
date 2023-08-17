import type { Meta, StoryObj } from '@storybook/react'

import AllCards from './AllCards'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AllCards> = {
  title: 'Templates/AllCards',
  component: AllCards,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof AllCards>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'AllCards',
  },
}

export const Secondary: Story = {
  args: {
    label: 'AllCards',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'AllCards',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'AllCards',
  },
}
