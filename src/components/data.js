export default {
    story: {
      chapters: [
        {
          title: 'Francesca',
          type: 'extract',
          scenes: [
            { title: 'pa do',
              tiers: [
                { type: 'static',
                  rows: [
                    { grow: 2,
                      panels: [
                      { name: 't01-p01', type: 'animated', effect: 'rotate', visible: true, position: '32% 30%', size: '212%' },
                    ] },
                    { panels: [
                      { name: 't01-p02', type: 'static', position: 'left top' },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { name: 't02-p01', type: 'static', position: 'left top' }, { name: 't02-p02', type: 'static', position: 'right top' },
                    ] },
                    { panels: [
                      { name: 't02-p03', type: 'static', position: 'center top', grow: 2 }, { name: 't02-p04', type: 'static', position: 'center bottom', grow: 1, shrink: 1 },
                    ] },
                    { panels: [
                      { name: 't02-p05', type: 'static', position: 'center top', grow: 1.4 }, { name: 't02-p06', type: 'static', position: 'right bottom' },
                    ] },
                  ], // rows #2
                  }, // tier # 2
                  { type: 'static',
                    rows: [
                      { panels: [
                        { name: 't03-p01', type: 'static', position: 'center top' },
                      ] },
                      { panels: [
                        { name: 't03-p02', type: 'static', position: 'center top' },
                      ] },
                      { panels: [
                        { name: 't03-p03', type: 'static', position: 'center top' },
                      ] },
                    ],
                  },
                ], // tiers
              }, // scene
            { title: 'i arkivet',
              tiers: [
                { type: 'static',
                  rows: [
                    { panels: [
                      { name: 't04-p01', type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { name: 't04-p02', type: 'static', position: 'right top' }, { name: 't04-p03', type: 'static', position: 'left top' },
                    ] },
                    { panels: [
                      { name: 't04-p04', type: 'static', position: 'center bottom' },
                    ] },

                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { name: 't05-p01', type: 'static', position: 'right top' },
                    ] },
                    { panels: [
                      { name: 't05-p02', type: 'static', position: 'right top' }, { name: 't05-p03', type: 'static', position: 'center top', grow: 0.6 }, { name: 't05-p04', type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { name: 't05-p05', type: 'static', position: 'left bottom' }, { name: 't05-p06', type: 'static', position: 'center bottom', grow: 2 },
                    ] },
                    ],
                  },
              ],
            },
            { title: 'jakten',
              tiers: [
                { type: 'static',
                  rows: [
                    { panels: [
                      { name: 't06-p01', type: 'static', position: 'center bottom' },
                    ] },
                    { panels: [
                      { name: 't06-p02', type: 'static', position: 'left bottom' },
                    ] },
                    { panels: [
                      { name: 't06-p03', type: 'static', position: 'center top' },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { name: 't07-p01', type: 'static', position: 'right top', grow: 1.35 }, { name: 't07-p02', type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { name: 't07-p03', type: 'static', position: 'left top' },
                    ] },
                    { panels: [
                      { name: 't07-p04', type: 'static', position: 'left top' },
                    ] },
                  ],
                },
                { type: 'interactive',
                  rows: [
                    { panels: [
                      { name: 't08-p01',
                        type: 'static',
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
                              animAsset: 't08-int.png',
                            },
                          },
                        ],
                      },
                    ] },
                    { panels: [
                      { name: 't08-p02',
                        type: 'static',
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
                              animAsset: 't08-int.png',
                            },
                          },
                        ],
                      },
                    ] },
                    { panels: [
                      { name: 't08-p03',
                        type: 'static',
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
                              animAsset: 't08-int.png',
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
                      { name: 't09-p01', type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { name: 't09-p02', type: 'static', position: 'right top' }, { name: 't09-p03', type: 'static', position: 'left bottom', grow: 1.6 },
                    ] },
                    { panels: [
                      { name: 't09-p04', type: 'static', position: 'left bottom' }, { name: 't09-p05', type: 'static', position: 'right top', grow: 2 },
                    ] },
                  ],
                },
                { type: 'interactive',
                  rows: [
                    { panels: [
                      { name: 't10-p01', type: 'animated', effect: 'zoomoutonce', visible: true, position: '-73%, -72%' },
                    ] },
                    { panels: [
                      {
                        name: 't10-p02',
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
                              animAsset: 't08-int.png',
                            },
                          },
                        ],
                      },
                    ] },
                    ],
                },
              ],
            },
            { title: 'forhoret',
              tiers: [
                { type: 'static',
                  rows: [
                    { panels: [
                      { name: 't11-p01', type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { name: 't11-p02', type: 'static', position: 'left top' },
                    ] },
                    { panels: [
                      { name: 't11-p03', type: 'static', position: 'center top' },
                    ] },
                  ],
                },
                { type: 'static',
                  rows: [
                    { panels: [
                      { name: 't12-p01', type: 'static', position: 'center bottom' },
                    ] },
                    { panels: [
                      { name: 't12-p02', type: 'static', position: 'center top' }, { name: 't12-p03', type: 'static', position: 'left top', grow: 1.6 },
                    ] },
                    { panels: [
                      { name: 't12-p04', type: 'static', position: 'center top' },
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
