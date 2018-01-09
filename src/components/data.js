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
                      { type: 'static', position: 'left top' }, { type: 'static', position: 'right top', grow: 1, shrink: 1 },
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
                        { type: 'static', position: 'left top' }, { type: 'static', position: 'center top' },
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
                      { type: 'static', position: 'right top' }, { type: 'static', position: 'left top' },
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
                      { type: 'static', position: 'right top' }, { type: 'static', position: 'center top', grow: 0.6 }, { type: 'static', position: 'center top' },
                    ] },
                    { panels: [
                      { type: 'static', position: 'left bottom' }, { type: 'static', position: 'center bottom', grow: 2 },
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
                      { type: 'static', position: 'right top', grow: 1.35 }, { type: 'static', position: 'center top' },
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
                  rows: [
                  { panels: [
                    { type: 'static',
                      position: 'center bottom',
                      interactionContext: true,
                      interactionStep: 0,

                    },
                  ] },
                  { panels: [
                    { type: 'static',
                      position: 'center bottom',
                      interactionContext: true,
                      interactionStep: 1,

                    },
                  ] },
                  { panels: [
                    { type: 'static',
                      position: 'center bottom',
                      interactionContext: true,
                      interactionStep: 2,
                    },
                  ] },
                ],
                  sequentialSteps: [
                    { interaction:
                          { gesture: 'swipe',
                            mapping: 'viewport',
                            animation: {
                              animEvent: 'swipeInFlyOut',
                              axis: 'X',
                              direction: 'opposite',
                            },
                            interactionItem: {
                              animAsset: 't04-int_el0.png',
                            },
                          },
                    },
                    { interaction:
                        { gesture: 'swipe',
                          mapping: 'viewport',
                          animation: {
                            animEvent: 'swipeInFlyOut',
                            axis: 'X',
                            direction: 'normal',
                          },
                          interactionItem: {
                            animAsset: 't04-int_el0.png',
                          },
                        },
                    },
                    { interaction:
                      { gesture: 'swipe',
                        mapping: 'viewport',
                        animation: {
                          animEvent: 'swipeInFlyOut',
                          axis: 'X',
                          direction: 'opposite',
                        },
                        interactionItem: {
                          animAsset: 't04-int_el0.png',
                        },
                      },
                    },
                    { interaction:
                      { gesture: 'none',
                        mapping: 'viewport',
                        animation: {
                          animEvent: 'swipeInFlyOut',
                          axis: 'X',
                          direction: 'opposite',
                        },
                        interactionItem: {
                          animAsset: 't04-int_el0.png',
                        },
                      },
                    },
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
                  rows: [
                    { panels: [
                      { type: 'animated',
                      effect: 'zoomoutonce',
                      visible: true,
                      position: '-73%, -72%',
                     },
                    ] },
                    { panels: [
                      {
                        type: 'static',
                        position: 'center top',
                        interactionContext: true,
                        interactionStep: 0,
                      },
                    ] },
                  ],
                  sequentialSteps: [
                    { interaction:
                        { gesture: 'swipe',
                          mapping: 'viewport',
                          animation: {
                            animEvent: 'fadeToBlack',
                            axis: 'X',
                            direction: 'opposite',
                          },
                          interactionItem: {
                            animAsset: 't06-r1-p0-spr.jpg',
                          },
                        },
                    },
                    { interaction:
                        { gesture: 'none',
                          mapping: 'none',
                          animation: {
                            animEvent: 'fadeToBlack',
                            axis: 'none',
                            direction: 'none',
                            callback: 'mainSliderToNext',
                          },
                          interactionItem: {
                            animAsset: 't06-r1-p0-spr.jpg',
                          },
                        },
                    },
                  ],
                  animation: {
                    effect: 'fadeToBlack',
                  },

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
                      { type: 'static', position: 'center top' }, { type: 'static', position: 'left top', grow: 1.6 },
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
