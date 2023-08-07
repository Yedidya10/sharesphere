import type { Meta, StoryObj } from '@storybook/react'

import ItemAlertButton from './ItemAlertButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemAlertButton> = {
  title: 'Templates/ItemAlertButton',
  component: ItemAlertButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemAlertButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemAlertButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemAlertButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemAlertButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemAlertButton',
  },
}
