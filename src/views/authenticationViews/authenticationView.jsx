import "src/css/authenticationStyle.css"

export function AuthenticationView(props){

    function handleSignInClick (){
        
    }
    
    function handleSignUpClick (){
        props.onSignUpClick()
    }

    return (
        <div>
             <button>Sign In</button>
             <button onClick={handleSignUpClick}>Sign Up</button>                  
        </div>

    ) 

}