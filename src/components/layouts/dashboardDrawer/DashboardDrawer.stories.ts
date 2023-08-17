import type { Meta, StoryObj } from '@storybook/react'

import DashboardDrawer from './DashboardDrawer'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DashboardDrawer> = {
  title: 'Templates/DashboardDrawer',
  component: DashboardDrawer,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof DashboardDrawer>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'DashboardDrawer',
  },
}

export const Secondary: Story = {
  args: {
    label: 'DashboardDrawer',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'DashboardDrawer',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'DashboardDrawer',
  },
}
