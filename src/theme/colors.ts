import { Tuple, DefaultMantineColor } from "@mantine/core";

export const colors = {
    primary: [
        "#FFF4D6",
        "#FFE6AD",
        "#FFD484",
        "#FFC366",
        "#FFA733",
        "#DB8425",
        "#B76519",
        "#934910",
        "#7A3609",
    ],
    success: [
        "#F1FDD7",
        "#DFFBB1",
        "#C5F487",
        "#AAE967",
        "#84DB39",
        "#65BC29",
        "#4A9D1C",
        "#337F12",
        "#22690A",
    ],
    info: [
        "#D6FEFE",
        "#AEFAFE",
        "#85EEFE",
        "#67DFFD",
        "#35C7FC",
        "#269CD8",
        "#1A76B5",
        "#105492",
        "#0A3C78",
    ],
    warning: [
        "#FEF9D7",
        "#FEF3B0",
        "#FEE988",
        "#FDE06B",
        "#FCD23A",
        "#D8AF2A",
        "#B58D1D",
        "#926D12",
        "#78570B",
    ],
    danger: [
        "#FFE2E0",
        "#FFC1C2",
        "#FFA3AD",
        "#FF8CA4",
        "#FF6696",
        "#DB4A86",
        "#B73376",
        "#932066",
        "#7A135C",
    ],
};

type CustomColors =
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | DefaultMantineColor;

export const themeColors = colors as Record<CustomColors, Tuple<string, 10>>;

declare module "@mantine/core" {
    export interface MantineThemeColorsOverride {
        colors: Record<CustomColors, Tuple<string, 10>>;
    }
}
