import type { Meta, StoryObj } from '@storybook/react'

import SettingsMenuList from './SettingsMenuList'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SettingsMenuList> = {
  title: 'Templates/SettingsMenuList',
  component: SettingsMenuList,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SettingsMenuList>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SettingsMenuList',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SettingsMenuList',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SettingsMenuList',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SettingsMenuList',
  },
}
