export default {
    story: {
      chapters: [
        {
          title: 'Francesca',
          type: 'extract',
          scenes: [
            { number: 0,
              title: 'på do',
              tiers: [
                { type: 'static',
                  rows: [
                    { grow: 2,
                      panels: [
                      { type: 'animated', effect: 'rotate', visible: true, position: '32% 30%', size: '212%' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left top' },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'left top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left top' }, { name: 't02-p03', type: 'static', position: 'right top', grow: 1, shrink: 1 },
                    ] },
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                  ], // rows #2
                  }, // tier # 2
                  { type: 'static',
                    rows: [
                      { panels: [
                        { type: 'static', position: 'left top' },
                      ] },
                      { panels: [
                        { type: 'static', position: 'left top' }, { name: 't03-p03', type: 'static', position: 'center top' },
                      ] },
                      { panels: [
                        { type: 'static', position: 'center top' },
                      ] },
                    ],
                  },
                ], // tiers
              }, // scene
            { number: 1,
              title: 'jakten',
              tiers: [
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'right top' }, { name: 't04-p03', type: 'static', position: 'left top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'center bottom' },
                    ] },

                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'right top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'right top' }, { name: 't05-p03', type: 'static', position: 'center top', grow: 0.6 }, { name: 't05-p04', type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left bottom' }, { name: 't05-p06', type: 'static', position: 'center bottom', grow: 2 },
                    ] },
                    ],
                  },
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'center bottom' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left bottom' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'right top', grow: 1.35 }, { name: 't07-p02', type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left top' },
                    ] },
                  ],
                },
                { type: 'interactive',
                  interactionContext: ['panel', 'panel', 'panel'],
                  rows: [
                    { panels: [
                      { type: 'static',
                        position: 'center bottom',
                        interactions: [
                          { interactionIndex: 0,
                            gesture: 'swipe',
                            animation: {
                              behaviour: 'swipeInFlyOut',
                              axis: 'X',
                              direction: 'opposite',
                            },
                            interactionItem: {
                              animAsset: 't04-int_el0.png',
                            },
                          },
                        ],
                      },
                    ] },
                    { panels: [
                      { type: 'static',
                        position: 'center bottom',
                        interactions: [
                          { interactionIndex: 1,
                            gesture: 'swipe',
                            animation: {
                              behaviour: 'swipeInFlyOut',
                              axis: 'X',
                              direction: 'opposite',
                            },
                            interactionItem: {
                              animAsset: 't04-int_el0.png',
                            },
                          },
                        ],
                      },
                    ] },
                    { panels: [
                      { type: 'static',
                        position: 'center bottom',
                        interactions: [
                          { interactionIndex: 2,
                            gesture: 'swipe',
                            animation: {
                              behaviour: 'swipeInFlyOut',
                              axis: 'X',
                              direction: 'opposite',
                            },
                            interactionItem: {
                              animAsset: 't04-int_el0.png',
                            },
                          },
                        ],
                      },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'right top' }, { type: 'static', position: 'left bottom', grow: 1.6 },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left bottom' }, { type: 'static', position: 'right top', grow: 2 },
                    ] },
                  ],
                },
                { type: 'interactive',
                interactionContext: ['panel'],
                  animation: {
                    effect: 'fadeToBlack',
                  },
                  rows: [
                    { panels: [
                      { type: 'animated', effect: 'zoomoutonce', visible: true, position: '-73%, -72%' },
                    ] },
                    { panels: [
                      {
                        type: 'static',
                        position: 'center top',
                        interactions: [
                          { interactionIndex: 0,
                            gesture: 'swipe',
                            animation: {
                              behaviour: 'swipeInFlyOut',
                              axis: 'X',
                              direction: 'opposite',
                            },
                            interactionItem: {
                              animAsset: 't06-r1-p0-spr.jpg',
                            },
                          },
                        ],
                      },
                    ] },
                    ],
                },
              ],
            },
            { number: 2,
              title: 'forhoret',
              tiers: [
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { type: 'static', position: 'center bottom' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'center top' }, { name: 't12-p03', type: 'static', position: 'left top', grow: 1.6 },
                    ] },
                    { panels: [
                      { type: 'static', position: 'center top' },
                    ] },
                  ],
                },
              ], // tiers
            }, // scene
          ], // scenes
        },
   // chapter
      ],  // chapters
    },
};
