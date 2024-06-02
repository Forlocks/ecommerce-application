export interface ISliderBasic {
  images: string[];
  initialSlide?: number;
  className?: string;
  openModal?: (content: React.ReactNode) => void;
  showArrows?: boolean;
  onClickThumbnail?: (index: number) => void;
}
