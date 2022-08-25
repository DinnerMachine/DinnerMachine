import { MantineThemeOverride } from '@mantine/core';
import { themeColors } from './colors';

const DMTheme: MantineThemeOverride = {
    colors: themeColors,
    primaryColor: 'primary',
    primaryShade: 5,
    headings: {
        fontFamily: 'Lets-Coffee',
        fontWeight: 800,
    },
};

export default DMTheme;
