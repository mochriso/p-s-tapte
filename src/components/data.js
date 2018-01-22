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
                      { type: 'animated', effect: 'rotate-loop', visible: true, position: '32% 30%', size: '212%' },
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
                  { type: 'interactive',
                    rows: [
                      { panels:
                        [
                          {
                            type: 'static',
                            position: 'left top',
                          },
                        ],
                      },
                      { panels:
                        [
                          {
                            type: 'static',
                            position: 'left top',
                          },
                          {
                            type: 'static',
                            position: 'center top',
                          },
                        ],
                      },
                      { panels:
                        [
                          {
                            type: 'static',
                            position: 'center top',
                            interactionContext: true,
                            interactionStep: 0,
                          },
                        ],
                      },
                    ],
                    sequentialSteps: [
                      { interaction:
                            { gesture: 'swipe',
                              mapping: 'viewport',
                              animation: {
                                animEvent: 'swipeInFlyOut',
                                axis: 'X',
                                direction: 'swiperDir',
                                // callback: [
                                //     {
                                //     type: 'toggleSwapContextArt',
                                //     timing: 'onIntSlideChange',
                                //     context: 'panel',
                                //   },
                                // ],
                              },
                              interactionItem: {
                                animAsset: 't02-r2-p0-int-el.jpg',
                              },
                            },
                      },
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
                              direction: 'opposingDir',
                              // callback: [
                              //     {
                              //     type: 'toggleSwapContextArt',
                              //     timing: 'onIntSlideChange',
                              //     context: 'panel',
                              //   },
                              // ],
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
                            direction: 'swiperDir',
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
                          direction: 'opposingDir',
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
                      {
                        type: 'animated',
                        effect: 'zoom-out-loop',
                        visible: true,
                     },
                    ] },
                    { grow: 2,
                      panels: [
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
                            animEvent: 'swipeInFlyOut',
                            axis: 'X',
                            direction: 'opposingDir',
                            callback: [
                              {
                                timing: 'idleEnd',
                                context: 'mainSlider',
                                specs: {
                                  type: 'slideNext',
                                  transition: 'fade-to-black',
                                },
                              },
                            ],
                          },
                          interactionItem: {
                            animAsset: 't06-r1-p0-spr.jpg',
                          },
                        },
                    },
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
