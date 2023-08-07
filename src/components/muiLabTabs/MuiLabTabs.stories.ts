import type { Meta, StoryObj } from '@storybook/react'

import MuiLabTabs from './MuiLabTabs'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MuiLabTabs> = {
  title: 'Templates/MuiLabTabs',
  component: MuiLabTabs,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof MuiLabTabs>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'MuiLabTabs',
  },
}

export const Secondary: Story = {
  args: {
    label: 'MuiLabTabs',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'MuiLabTabs',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'MuiLabTabs',
  },
}
