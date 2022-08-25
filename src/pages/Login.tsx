import React, { useEffect, useState } from "react";

import { useForm } from "@mantine/form";

import "../scss/main.scss";

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Divider,
    LoadingOverlay,
    Transition,
} from "@mantine/core";

import { GoogleButton } from "../components/mantine/SocialButtons/SocialButtons";

import { signInWithGoogle, LoginData, signedIn } from "../api/Firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { getGreeting } from "../util/greetings";

function LoginPage() {
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) =>
                value.length > 20
                    ? null
                    : "Password must be at least 20 characters long",
        },
    });

    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(true);

    const [greeting, setGreeting] = useState(getGreeting());

    let state = location.state as { from: { pathname: string } };

    let from =
        state?.from?.pathname ||
        localStorage.getItem("redirectURL") ||
        "/welcome";
    localStorage.removeItem("redirectURL");

    useEffect(() => {
        signedIn(signedInCallback);
    }, []);

    function signedInCallback(user: User | null, redirect: boolean) {
        if (user) {
            if (redirect) {
                navigate(from, { replace: true });
            } else {
                navigate(-1);
            }
        } else {
            setLoading(false);
        }
    }

    const googleSignInHandler = function (
        event: React.MouseEvent<HTMLButtonElement>
    ): void {
        localStorage.setItem("redirectURL", from);
        let data = form.values as LoginData;
        signInWithGoogle(data).then(() => {
            navigate("/welcome");
        });
    };

    const emailSignInHandler = function (
        event: React.MouseEvent<HTMLButtonElement>
    ): void {
        form.validate();
        let data = form.values as LoginData;
        console.log(data);
    };

    const navigateToRegister = function (
        event: React.MouseEvent<HTMLAnchorElement>
    ): void {
        event.preventDefault();
        navigate("/register");
    };

    const navigateToResetPassword = function (
        event: React.MouseEvent<HTMLAnchorElement>
    ): void {
        event.preventDefault();
        navigate("/reset-password");
    };

    return (
        <div className="App">
            <LoadingOverlay
                visible={loading}
                overlayBlur={2}
                transitionDuration={500}
            />

            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({
                        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        fontWeight: 900,
                    })}
                >
                    {greeting}
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Don't already have an account?{" "}
                    <Anchor<"a">
                        href="register"
                        size="sm"
                        onClick={navigateToRegister}
                    >
                        Create account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <Group grow mb="md" mt="md">
                        <GoogleButton radius="xl" onClick={googleSignInHandler}>
                            Sign in with Google
                        </GoogleButton>
                    </Group>

                    <Divider
                        label="Or continue with email"
                        labelPosition="center"
                        my="lg"
                    />
                    <TextInput
                        label="Email"
                        placeholder="john.doe@recipegen.com"
                        required
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue("email", event.target.value)
                        }
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        mt="md"
                        {...form.getInputProps("password")}
                    />
                    <Group position="apart" mt="md">
                        <Checkbox
                            label="Remember me"
                            {...form.getInputProps("remember")}
                        />
                        <Anchor<"a">
                            onClick={navigateToResetPassword}
                            href="reset-password"
                            size="sm"
                        >
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Transition
                        mounted={form.values.remember}
                        transition="slide-down"
                        duration={400}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <Text
                                color="dimmed"
                                size="sm"
                                mt={5}
                                style={styles}
                            >
                                {form.values.remember
                                    ? "Please don't use this option on public devices."
                                    : ""}
                            </Text>
                        )}
                    </Transition>
                    <Button fullWidth mt="xl" onClick={emailSignInHandler}>
                        Sign in
                    </Button>
                </Paper>
            </Container>
        </div>
    );
}

export default LoginPage;
