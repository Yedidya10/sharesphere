import type { Meta, StoryObj } from '@storybook/react'

import CardModal from './CardModal'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardModal> = {
  title: 'Templates/CardModal',
  component: CardModal,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CardModal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CardModal',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CardModal',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CardModal',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CardModal',
  },
}
