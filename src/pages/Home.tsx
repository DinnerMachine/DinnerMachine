import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useState } from "react";

import { Button } from "@mantine/core";

function HomePage() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <h1>Dinerator</h1>
            <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </Button>
        </div>
    );
}

export default HomePage;
