import type { Meta, StoryObj } from '@storybook/react'

import Providers from './Providers'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Providers> = {
  title: 'Components/Auth/Providers',
  component: Providers,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof Providers>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Providers',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Providers',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Providers',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Providers',
  },
}
