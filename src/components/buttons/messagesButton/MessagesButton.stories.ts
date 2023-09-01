import type { Meta, StoryObj } from '@storybook/react'

import MessagesButton from './MessagesButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MessagesButton> = {
  title: 'Templates/MessagesButton',
  component: MessagesButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof MessagesButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'MessagesButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'MessagesButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'MessagesButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'MessagesButton',
  },
}
