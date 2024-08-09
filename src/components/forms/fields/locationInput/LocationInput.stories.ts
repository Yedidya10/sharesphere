import type { Meta, StoryObj } from '@storybook/react'

import LocationInput from './LocationInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LocationInput> = {
  title: 'Templates/LocationInput',
  component: LocationInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof LocationInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'LocationInput',
  },
}

export const Secondary: Story = {
  args: {
    label: 'LocationInput',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'LocationInput',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'LocationInput',
  },
}
