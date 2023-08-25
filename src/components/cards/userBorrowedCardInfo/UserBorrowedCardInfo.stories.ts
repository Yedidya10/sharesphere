import type { Meta, StoryObj } from '@storybook/react'

import UserBorrowedCardInfo from './UserBorrowedCardInfo'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UserBorrowedCardInfo> = {
  title: 'Templates/UserBorrowedCardInfo',
  component: UserBorrowedCardInfo,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof UserBorrowedCardInfo>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'UserBorrowedCardInfo',
  },
}

export const Secondary: Story = {
  args: {
    label: 'UserBorrowedCardInfo',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'UserBorrowedCardInfo',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'UserBorrowedCardInfo',
  },
}
