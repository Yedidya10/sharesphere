import type { Meta, StoryObj } from '@storybook/react'

import BackgroundModeSwitch from './BackgroundModeSwitch'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BackgroundModeSwitch> = {
  title: 'Templates/BackgroundModeSwitch',
  component: BackgroundModeSwitch,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof BackgroundModeSwitch>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'BackgroundModeSwitch',
  },
}

export const Secondary: Story = {
  args: {
    label: 'BackgroundModeSwitch',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'BackgroundModeSwitch',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'BackgroundModeSwitch',
  },
}
