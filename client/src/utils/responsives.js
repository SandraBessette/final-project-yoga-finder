export const size = {
    SmallPhone: 320,
    phone: 480,
    tablet: 768,
    desktop: 1024,
    largeDesktop: 1440,
  };

  
export const device = {
    smallPhone: `(max-width: ${size.smallPhone}px)`,
    phone: `(max-width: ${size.phone}px)`,
    smallTablet: `(max-width: ${size.tablet}px)`,
    tablet: `(max-width: ${size.desktop}px)`,
    largeDesktop: `(min-width: ${size.largeDesktop}px)`,
  };

export const onSmallPhoneMediaQuery = () => `
    @media ${device.smallPhone}
`;
export const onPhoneMediaQuery = () => `
    @media ${device.phone}
`;
export const onSmallTabletMediaQuery = () => `
    @media ${device.smallTablet}
`;
export const onTabletMediaQuery = () => `
    @media ${device.tablet}
`;
export const onLargeDesktopMediaQuery = () => `
    @media ${device.largeDesktop}
`;
