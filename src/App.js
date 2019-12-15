// ! External

import React, { useState } from "react";

// ! Internal

import TeamSelectDialog from "./TeamSelectDialog.js";
import BuildYourTeam from "./BuildYourTeam.js";

function App() {
    // ! Methods

    const saveTeam = params => {};

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <BuildYourTeam setIsDialogOpen={setIsDialogOpen} />
            {isDialogOpen && (
                <TeamSelectDialog
                    open={isDialogOpen}
                    saveTeam={saveTeam}
                    setIsDialogOpen={setIsDialogOpen}
                />
            )}
        </div>
    );
}

export default App;
