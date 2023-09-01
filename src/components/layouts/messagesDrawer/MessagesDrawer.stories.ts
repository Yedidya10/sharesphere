import type { Meta, StoryObj } from '@storybook/react'

import MessagesDrawer from './MessagesDrawer'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MessagesDrawer> = {
  title: 'Templates/MessagesDrawer',
  component: MessagesDrawer,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof MessagesDrawer>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'MessagesDrawer',
  },
}

export const Secondary: Story = {
  args: {
    label: 'MessagesDrawer',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'MessagesDrawer',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'MessagesDrawer',
  },
}
