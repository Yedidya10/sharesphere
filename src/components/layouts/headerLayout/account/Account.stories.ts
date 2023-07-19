import type { Meta, StoryObj } from '@storybook/react'

import Account from './Account'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Account> = {
  title: 'Templates/Account',
  component: Account,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof Account>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Account',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Account',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Account',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Account',
  },
}
