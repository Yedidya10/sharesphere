import type { Meta, StoryObj } from '@storybook/react'

import GeneralSettingsButton from './GeneralSettingsButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof GeneralSettingsButton> = {
  title: 'Templates/GeneralSettingsButton',
  component: GeneralSettingsButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof GeneralSettingsButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'GeneralSettingsButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'GeneralSettingsButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'GeneralSettingsButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'GeneralSettingsButton',
  },
}
