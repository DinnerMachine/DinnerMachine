import {
    createStyles,
    Card,
    Avatar,
    Text,
    Group,
    Button,
    Skeleton,
    Center,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `2px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
        }`,
    },
}));

interface UserCardImageProps {
    image: string;
    avatar: string;
    name: string;
    username: string;
    stats: { label: string; value: string }[];
}

export function UserCardImage({
    image,
    avatar,
    name,
    username,
    stats,
}: UserCardImageProps) {
    const { classes, theme } = useStyles();

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text align="center" size="lg" weight={500}>
                {stat.value}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {stat.label}
            </Text>
        </div>
    ));

    function AvatarLoader(props: { avatar: string }) {
        if (props.avatar) {
            return (
                <Avatar
                    src={props.avatar}
                    size={80}
                    radius={80}
                    mx="auto"
                    mt={-30}
                    className={classes.avatar}
                />
            );
        } else {
            return (
                <Skeleton
                    height={80}
                    circle
                    radius={80}
                    mx="auto"
                    mt={-30}
                    className={classes.avatar}
                />
            );
        }
    }

    function TextLoader(props: { [key: string]: any }) {
        if (props.children) {
            return <Text {...props}> {props.children} </Text>;
        } else {
            return (
                <Center>
                    <Skeleton height={10} width={150} mt={6} />
                </Center>
            );
        }
    }

    return (
        <Card withBorder p="xl" radius="md" className={classes.card}>
            <Card.Section
                sx={{ backgroundImage: `url(${image})`, height: 140 }}
            />
            <AvatarLoader avatar={avatar} />
            <TextLoader align="center" size="lg" weight={500} mt="sm">
                {name}
            </TextLoader>
            <TextLoader align="center" size="sm" color="dimmed">
                {username ? "@" + username : null}
            </TextLoader>
            <Group mt="md" position="center" spacing={30}>
                {items}
            </Group>
            <Button
                fullWidth
                radius="md"
                mt="xl"
                size="md"
                color={theme.colorScheme === "dark" ? undefined : "dark"}
            >
                Follow
            </Button>
        </Card>
    );
}
