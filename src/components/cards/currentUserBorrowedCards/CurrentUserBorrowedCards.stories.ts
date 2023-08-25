import type { Meta, StoryObj } from '@storybook/react'

import CurrentUserBorrowedCards from './CurrentUserBorrowedCards'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CurrentUserBorrowedCards> = {
  title: 'Templates/CurrentUserBorrowedCards',
  component: CurrentUserBorrowedCards,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CurrentUserBorrowedCards>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CurrentUserBorrowedCards',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CurrentUserBorrowedCards',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CurrentUserBorrowedCards',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CurrentUserBorrowedCards',
  },
}
