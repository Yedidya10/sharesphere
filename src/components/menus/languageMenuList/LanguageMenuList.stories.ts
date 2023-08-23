import type { Meta, StoryObj } from '@storybook/react'

import LanguageMenuList from './LanguageMenuList'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LanguageMenuList> = {
  title: 'Templates/LanguageMenuList',
  component: LanguageMenuList,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof LanguageMenuList>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'LanguageMenuList',
  },
}

export const Secondary: Story = {
  args: {
    label: 'LanguageMenuList',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'LanguageMenuList',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'LanguageMenuList',
  },
}
