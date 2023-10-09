/**
 * Renders the AuthLayout component that contains the SignIn and SignUp components inside it.
 * @param {React.ReactNode} children - the children to be rendered inside the AuthLayout component
 * @return {React.ReactNode} - the rendered AuthLayout component
 */
const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
    <div 
    className='h-full flex items-center justify-center'>
        {children}
    </div> );
}
 
export default AuthLayout;