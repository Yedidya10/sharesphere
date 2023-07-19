import type { Meta, StoryObj } from '@storybook/react'

import ItemPostButton from './ItemPostButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemPostButton> = {
  title: 'Templates/ItemPostButton',
  component: ItemPostButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemPostButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemPostButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemPostButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemPostButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemPostButton',
  },
}
