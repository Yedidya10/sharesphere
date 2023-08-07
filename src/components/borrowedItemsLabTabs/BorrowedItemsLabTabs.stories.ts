import type { Meta, StoryObj } from '@storybook/react'

import BorrowedItemsLabTabs from './BorrowedItemsLabTabs'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BorrowedItemsLabTabs> = {
  title: 'Templates/BorrowedItemsLabTabs',
  component: BorrowedItemsLabTabs,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof BorrowedItemsLabTabs>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'BorrowedItemsLabTabs',
  },
}

export const Secondary: Story = {
  args: {
    label: 'BorrowedItemsLabTabs',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'BorrowedItemsLabTabs',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'BorrowedItemsLabTabs',
  },
}
