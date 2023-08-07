import type { Meta, StoryObj } from '@storybook/react'

import PublishedItemsLabTabs from './PublishedItemsLabTabs'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PublishedItemsLabTabs> = {
  title: 'Templates/PublishedItemsLabTabs',
  component: PublishedItemsLabTabs,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof PublishedItemsLabTabs>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'PublishedItemsLabTabs',
  },
}

export const Secondary: Story = {
  args: {
    label: 'PublishedItemsLabTabs',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'PublishedItemsLabTabs',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'PublishedItemsLabTabs',
  },
}
