import type { Meta, StoryObj } from '@storybook/react'

import CurrentUserCards from './CurrentUserCards'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CurrentUserCards> = {
  title: 'Templates/CurrentUserCards',
  component: CurrentUserCards,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CurrentUserCards>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CurrentUserCards',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CurrentUserCards',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CurrentUserCards',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CurrentUserCards',
  },
}
