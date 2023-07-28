import type { Meta, StoryObj } from '@storybook/react'

import ItemRequestButton from './ItemRequestButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemRequestButton> = {
  title: 'Templates/ItemRequestButton',
  component: ItemRequestButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemRequestButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemRequestButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemRequestButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemRequestButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemRequestButton',
  },
}
