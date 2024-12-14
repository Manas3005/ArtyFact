
export function Button({ className, onClick, children}) {
    //children delen kan vara namnet på knappen, eller det som står på knappen.
    return (
        <button className={className} onClick={onClick}>
            {Children}
        </button>
    )
}

export function SignInButton({className}) {
    const handleclick = () => {
        //Locate to sign in
    }
    return (
        <button className={className}>Sign In</button>
    )
}

/**
 * 
 * A button component specific to the back to home button.
 * The programmer is able to specify the styling of the button should there be slight differences.
 */
export function BackToHomeButton({ className}) {
    const handleClick = () => window.location.hash = "#/";
    return <button className={className}   onClick={handleClick}>Back To Home</button>;
}

/**
 * 
 * A button component specific to the my journals button.
 * The programmer is able to specify the styling of the button should there be slight differences.
 */
export function MyJournalsButton({className}) {
    const handleClick = () => window.location.hash = "/myjournals";
    return <button className={className} onClick={handleClick}>My Journals</button>;
}
