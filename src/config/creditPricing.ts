export type ActionType =
  | 'TXT_TO_IMAGE_GEN'
  | 'IMG_TO_IMAGE_GEN'
  | 'AUDIO_GEN'
  | 'STORY_GEN'
  | 'TXT_TO_VIDEO_GEN'
  | 'IMG_TO_VIDEO_GEN'
  | 'SCENE_GEN'
  | 'NARRATION_GEN';

export const CREDIT_PRICING: Record<ActionType, Record<number, number>> = {
  TXT_TO_IMAGE_GEN: {
    1: 2,
    2: 6,
    3: 10,
    4: 15,
    5: 25,
  },

  IMG_TO_IMAGE_GEN: {
    1: 2,
    2: 6,
    3: 10,
    4: 15,
    5: 25,
  },

  AUDIO_GEN: {
    1: 2,
    2: 5,
    3: 8,
    4: 12,
    5: 20,
  },

  STORY_GEN: {
    1: 1,
    2: 3,
    3: 6,
    4: 10,
    5: 15,
  },

  SCENE_GEN: {
    1: 1,
    2: 2,
    3: 4,
    4: 6,
    5: 10,
    10: 60,
  },
  NARRATION_GEN: {
    1: 1,
    2: 3,
    3: 5,
    4: 8,
    5: 12,
  },

  TXT_TO_VIDEO_GEN: {
    2: 20,
    3: 35,
    4: 50,
    5: 75,
  },

  IMG_TO_VIDEO_GEN: {
    2: 20,
    3: 35,
    4: 50,
    5: 75,
  },
};
