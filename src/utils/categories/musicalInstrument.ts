const musicalInstrument = {
  value: 'musical-instrument',
  label: 'Musical Instrument',
  subCategories: [
    {
      value: 'guitar',
      label: 'Guitar',
      subCategories: [
        {
          value: 'acoustic-guitar',
          label: 'Acoustic Guitar',
        },
        {
          value: 'electric-guitar',
          label: 'Electric Guitar',
        },
        {
          value: 'bass-guitar',
          label: 'Bass Guitar',
        },
        {
          value: 'classical-guitar',
          label: 'Classical Guitar',
        },
        {
          value: 'other-guitar',
          label: 'Other Guitar',
        },
      ],
    },
    {
      value: 'drums',
      label: 'Drums',
    },
    {
      value: 'piano',
      label: 'Piano',
    },
    {
      value: 'violin',
      label: 'Violin',
    },
    {
      value: 'saxophone',
      label: 'Saxophone',
    },
    {
      value: 'trumpet',
      label: 'Trumpet',
    },
    {
      value: 'clarinet',
      label: 'Clarinet',
    },
    {
      value: 'flute',
      label: 'Flute',
      subCategories: [
        {
          value: 'piccolo',
          label: 'Piccolo',
        },
        {
          value: 'alto-flute',
          label: 'Alto Flute',
        },
        {
          value: 'bass-flute',
          label: 'Bass Flute',
        },
        {
          value: 'other-flute',
          label: 'Other Flute',
        },
      ],
    },
    {
      value: 'trombone',
      label: 'Trombone',
    },
    {
      value: 'other-musical-instrument',
      label: 'Other Musical Instrument',
    },
  ],
  conditionTextValue: {
    5: 'New/Like New, Excellent Condition',
    4: 'Slightly Worn, Fully Functional',
    3: 'Moderately Worn, Some Functionality Affected',
    2: 'Partially Damaged, Still Playable',
    1: 'Severely Damaged, Unplayable',
  },
}

export default musicalInstrument