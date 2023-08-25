import type { Meta, StoryObj } from '@storybook/react'

import CurrentUserOwnedCards from './CurrentUserOwnedCards'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CurrentUserOwnedCards> = {
  title: 'Templates/CurrentUserOwnedCards',
  component: CurrentUserOwnedCards,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CurrentUserOwnedCards>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CurrentUserOwnedCards',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CurrentUserOwnedCards',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CurrentUserOwnedCards',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CurrentUserOwnedCards',
  },
}
