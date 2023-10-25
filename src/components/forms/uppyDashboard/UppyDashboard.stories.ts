import type { Meta, StoryObj } from '@storybook/react'

import UppyDashboard from './UppyDashboard'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UppyDashboard> = {
  title: 'Templates/UppyDashboard',
  component: UppyDashboard,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof UppyDashboard>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'UppyDashboard',
  },
}

export const Secondary: Story = {
  args: {
    label: 'UppyDashboard',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'UppyDashboard',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'UppyDashboard',
  },
}
