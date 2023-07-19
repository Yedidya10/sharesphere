import type { Meta, StoryObj } from '@storybook/react'

import SimilarCards from './SimilarCards'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SimilarCards> = {
  title: 'Cards/SimilarCards',
  component: SimilarCards,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SimilarCards>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SimilarCards',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SimilarCards',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SimilarCards',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SimilarCards',
  },
}
