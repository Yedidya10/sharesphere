import type { Meta, StoryObj } from '@storybook/react'

import CardInfo from './CardInfo'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardInfo> = {
  title: 'Templates/CardInfo',
  component: CardInfo,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CardInfo>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CardInfo',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CardInfo',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CardInfo',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CardInfo',
  },
}
