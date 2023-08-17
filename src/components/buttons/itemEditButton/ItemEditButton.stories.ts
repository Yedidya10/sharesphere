import type { Meta, StoryObj } from '@storybook/react'

import ItemEditButton from './ItemEditButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemEditButton> = {
  title: 'Templates/ItemEditButton',
  component: ItemEditButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemEditButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemEditButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemEditButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemEditButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemEditButton',
  },
}
