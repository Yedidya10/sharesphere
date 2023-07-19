import type { Meta, StoryObj } from '@storybook/react'

import SpringModal from './SpringModal'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpringModal> = {
  title: 'Templates/SpringModal',
  component: SpringModal,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SpringModal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SpringModal',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SpringModal',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SpringModal',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SpringModal',
  },
}
