import type { Meta, StoryObj } from '@storybook/react'

import ThemeModeMenuList from './ThemeModeMenuList'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ThemeModeMenuList> = {
  title: 'Templates/ThemeModeMenuList',
  component: ThemeModeMenuList,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ThemeModeMenuList>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ThemeModeMenuList',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ThemeModeMenuList',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ThemeModeMenuList',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ThemeModeMenuList',
  },
}
