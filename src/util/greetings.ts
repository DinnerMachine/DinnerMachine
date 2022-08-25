const GREETINGS = [
    "Hello!",
    "Hi there!",
    "Welcome back!",
    "Howdy!",
    "Good to see you!",
    "Nice to see you!",
    "Welcome!",
    "Let's get cooking!",
];

export function getGreeting() {
    return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}
