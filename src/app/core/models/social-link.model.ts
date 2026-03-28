export type SocialType = 'telegram' | 'instagram' | 'facebook';

export interface SocialLink {
  type: SocialType;
  url: string;
}
