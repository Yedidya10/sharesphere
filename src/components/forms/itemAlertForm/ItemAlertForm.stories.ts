import type { Meta, StoryObj } from '@storybook/react'

import ItemAlertForm from './ItemAlertForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemAlertForm> = {
  title: 'Templates/ItemAlertForm',
  component: ItemAlertForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemAlertForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemAlertForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemAlertForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemAlertForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemAlertForm',
  },
}
