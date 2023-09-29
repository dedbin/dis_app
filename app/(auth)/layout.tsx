const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return ( <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        {children}
    </div> );
}
 
export default AuthLayout;