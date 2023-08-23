import type { Meta, StoryObj } from '@storybook/react'

import SettingsMenu from './SettingsMenu'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SettingsMenu> = {
  title: 'Templates/SettingsMenu',
  component: SettingsMenu,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SettingsMenu>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SettingsMenu',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SettingsMenu',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SettingsMenu',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SettingsMenu',
  },
}
