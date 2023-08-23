import type { Meta, StoryObj } from '@storybook/react'

import AdminDashboardDrawer from './AdminDashboardDrawer'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AdminDashboardDrawer> = {
  title: 'Templates/AdminDashboardDrawer',
  component: AdminDashboardDrawer,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof AdminDashboardDrawer>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'AdminDashboardDrawer',
  },
}

export const Secondary: Story = {
  args: {
    label: 'AdminDashboardDrawer',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'AdminDashboardDrawer',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'AdminDashboardDrawer',
  },
}
