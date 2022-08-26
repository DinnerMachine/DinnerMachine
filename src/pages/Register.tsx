import React, { useEffect, useState } from 'react';

import { useForm } from '@mantine/form';

import '../scss/main.scss';

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
    Stepper,
    Center,
} from '@mantine/core';

import { GoogleButton } from '../components/mantine/SocialButtons/SocialButtons';

import { signInWithGoogle, LoginData, signedIn } from '../api/Firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { getGreeting } from '../util/greetings';

function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(0);
    const [stepComplete, setStepComplete] = useState(true);

    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <div className="App">
            <LoadingOverlay
                visible={loading}
                overlayBlur={2}
                transitionDuration={500}
            />

            <Container size={700} my={40}>
                <Title align="center">Register</Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Welcome! Let's get you signed up.
                </Text>
                <Stepper
                    active={active}
                    onStepClick={setActive}
                    breakpoint="sm"
                    mt={30}
                >
                    <Stepper.Step
                        label="Login Info"
                        description="Set up your account"
                    >
                        How would you like to log in?
                    </Stepper.Step>
                    <Stepper.Step
                        label="Details"
                        description="Add your details"
                    >
                        Tell us a bit about yourself!
                    </Stepper.Step>
                    <Stepper.Step
                        label="Finish Up"
                        description="Finalize your account"
                    >
                        Almost there! Please verify your email.
                    </Stepper.Step>
                    <Stepper.Completed>
                        All done! Let's go to your profile...
                    </Stepper.Completed>
                </Stepper>

                <Container size={500}>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Center mb="md" mt="md">
                            <GoogleButton
                                radius="xl"
                                style={{ width: '100%', maxWidth: 300 }}
                                onClick={() =>
                                    console.log('Signing in with google...')
                                }
                            >
                                Sign in with Google
                            </GoogleButton>
                        </Center>
                        <Divider
                            label="Or sign up with email"
                            labelPosition="center"
                            my="lg"
                        >
                            Or sign up with your email
                        </Divider>
                        <TextInput
                            label="Email"
                            placeholder="john.doe@dinnermachine.com"
                            required
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            required
                            mt="md"
                        />
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="Your password again"
                            required
                            mt="md"
                        />
                        <Group position="center" mt="xl">
                            <Button variant="default" onClick={prevStep}>
                                Back
                            </Button>
                            <Button onClick={nextStep} disabled={!stepComplete}>
                                Next step
                            </Button>
                        </Group>
                    </Paper>
                </Container>
            </Container>
        </div>
    );
}

export default RegisterPage;
