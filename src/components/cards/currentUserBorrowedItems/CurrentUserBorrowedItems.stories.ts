import type { Meta, StoryObj } from '@storybook/react'

import CurrentUserBorrowedItems from './CurrentUserBorrowedItems'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CurrentUserBorrowedItems> = {
  title: 'Templates/CurrentUserBorrowedItems',
  component: CurrentUserBorrowedItems,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CurrentUserBorrowedItems>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CurrentUserBorrowedItems',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CurrentUserBorrowedItems',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CurrentUserBorrowedItems',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CurrentUserBorrowedItems',
  },
}
